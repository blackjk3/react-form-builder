import Store from 'beedle';
import { get, post} from './requests';

let _data = [];
let _saveUrl;
let _onPost;
let _onLoad;

const store = new Store({  
    actions: {
        load(context, { loadData: urlOrData,  saveUrl }) {
            _saveUrl = saveUrl;        
            if(typeof urlOrData == 'string' || urlOrData instanceof String) {
                if (_onLoad) {
                    _onLoad().then(data => {
                        _data = data;
                        context.commit('setData', _data);
                    });
                } else {
                    get(urlOrData).then(data => {
                        _data = data;
                        context.commit('setData', _data);
                    });
                }
            } else {
                _data = urlOrData;
                context.commit('setData', _data);
            }
        },
        
        create(context, element) {
            _data.push(element);
            context.commit('setData', _data);
            this.save();
        },
        
        delete(context, element) {
            var index = _data.indexOf(element);
            _data.splice(index, 1);
            context.commit('setData', _data);
            this.save();
        },
        
        updateOrder(context, elements) {
            _data = elements;
            context.commit('setData', _data);
            this.save();
        },
        
        save(context) {
            if (_saveUrl) {
                if (_onPost) {
                    _onPost({ task_data: _data });
                } else {
                    post(_saveUrl, { task_data: _data });
                }               
            }
        },
    },

    mutations: {
        setData(state, payload) {
            state.data = payload;
            return state;
        }
    },

    initialState: {
        data: []
    },     
});

store.setExternalHandler = function(onLoad, onPost) {
    _onLoad = onLoad;
    _onPost = onPost;
}

export default store;