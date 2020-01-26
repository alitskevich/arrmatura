/**
 * https://core.telegram.org/bots/api#sendmessage
 */
function tgBot(cfg) {
  
  cfg = cfg || {};
  
  var TG_API = "https://api.telegram.org/bot";
  
  function apiCall(method, payload, payload2) {
    UrlFetchApp.fetch(
      TG_API + cfg.token + '/' + method, {
        method: 'POST',
        payload: Object.assign(payload, payload2 || {}),
        muteHttpExceptions: true
      }
    );
  }

  function sendMessage(cid, text, opts) {
    apiCall('sendMessage', { chat_id: cid, text: text }, opts);
  }

  function answerInlineQuery(qid,results, opts) {
    results = [].concat(results).map(function(e, index) {
      return Object.assign(
        {
          type: 'article',
          id: e.id || ''+index,
          title: e.title ||'#'+index,
          input_message_content: {
          message_text: e.message || '#'+index
        }
        },e)
    });
    
    apiCall('answerInlineQuery', { inline_query_id: qid, results: JSON.stringify(results) }, opts);  
  }
  
  var api = {
    init: function (){  
      apiCall('setWebhook', {url: ScriptApp.getService().getUrl()});
    },
    done: function(){  
      apiCall('disableWebhook');
    },
    me: function() {
      apiCall("getMe");
    },
    createEvent: function( data ) {
      var message = data.message || data.inline_query || data.chosen_inline_result || {};
      var input = message.text || message.query || '';
      var chat = message.chat || {};
      var from = message.from || {};
      var type = 'text';
      
      if (data.inline_query) {
        type = 'inlineQuery';
      } else if (data.chosen_inline_result) {
        type = 'inlineQueryResult';
      } else if (input[0]==='/') {
        var words = input.split(' ')
        type = words[0].slice(1).split('@')[0];
        input = words.slice(1).join(' ');
      }
      
      from.name = from.first_name + " " + (from.last_name||'');
      
      return Object.assign(message, {
          id: message.message_id,
          apiCall: apiCall,
          chat: chat,
          from: from,
          input: input,
          type: type,
          sendMessage: function(text, opts) {
            if (chat.id && text){
              sendMessage(chat.id, ''+text, opts);
            }
          },
          answerInlineQuery: function (results, opts) {
            if (data.inline_query && results){
              answerInlineQuery(data.inline_query.id, results, opts);
            }
          }
      });
    }
  };

  return api;
}

