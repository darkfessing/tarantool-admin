Ext.define('Admin.Viewport', {

  extend: 'Ext.Viewport',

  requires: [
    'Admin.Home.Tab',
    'Admin.field.Filter',
    'Admin.overrides.Toolbar',
  ],

  initComponent() {
    window.dispatch = this.dispatch.bind(this);
    window.dispatch.progress = this.dispatchProgress.bind(this);
    this.callParent(arguments);
  },

  layout: 'border',
  items: [ {
    region: 'center',
    xtype: 'tabpanel',
    border: false,
    layout: 'fit',
    items: [ {
      xtype: 'home-tab',
    } ],
    tabBar: {
      items: [ {
        xtype: 'tbfill',
      }, {
        xtype: 'button',
        name: 'version',
        baseCls: 'version-button',
        handler() {
          window.open('https://github.com/basis-company/tarantool-admin/releases');
        },
      } ],
    },
  } ],

  dispatch(job, params, silent = false) {
    params = params || {};
  
    if (!silent) {
      var el = (Ext.WindowManager.getActive() || this).el;
      var timeout = setTimeout(function() {
        el.mask('Please, wait');
      }, 250);
    }
  
    return new Promise(function(resolve, reject) {
      Ext.Ajax.request({
        method: 'post',
        url: '/admin/api',
        timeout: 300000, // Set timeout to 5 minutes (300,000 milliseconds)
        params: {
          rpc: Ext.JSON.encode({
            job: job,
            params: params,
          }),
        },
        success: response => {
          clearTimeout(timeout);
  
          try {
            var result = Ext.JSON.decode(response.responseText);
          }
          catch (e) {
            console.error('Failed to parse response:', e);
            result = {
              success: false,
              message: 'Failed to parse response',
            };
          }
  
          if (!silent && el.isMasked()) {
            setTimeout(function() {
              el.unmask();
            }, 250);
          }
  
          if (result.success) {
            resolve(result.data || {});
          }
          else {
            console.error('API error:', result.message);
            Ext.MessageBox.alert('Error', result.message);
            reject(result.message);
          }
        },
        failure: (response) => {
          clearTimeout(timeout);
          console.error('API request failed:', response.statusText);
          if (!silent && el.isMasked()) {
            setTimeout(function() {
              el.unmask();
            }, 250);
          }
          Ext.MessageBox.alert('Error', 'Request failed: ' + response.statusText);
          reject('Request failed: ' + response.statusText);
        }
      });
    });
  },
  
  dispatchProgress(job, data) {
    Ext.MessageBox.show({
      title:    'Processing',
      closable: false,
      modal:    true,
      progress: true,
      width:    450,
    });

    var results = [];

    var promise = Promise.resolve();

    data.forEach((params, i) => {
      promise = promise.then(() => {
        if (!Ext.MessageBox.progressBar) {
          return;
        }

        var value = i / data.length;
        var text  = i + ' / ' + data.length;

        if (!Ext.MessageBox.progressBar.isVisible()) {
          return;
        }

        Ext.MessageBox.progressBar.updateProgress(value, text, true);

        return this.dispatch(job, params, true)
          .then(result => {
            results.push(result);
            return results;
          });
      });
    });
    promise.then(function() {
      Ext.MessageBox.close();
    });
    return promise;
  },
});
