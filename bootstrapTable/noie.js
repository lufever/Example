
      var browser = {
          ua: navigator.userAgent.toLowerCase(),
          msie: function() {
              return /msie/.test(this.ua);
          },
          ie6: function() {
              var self = this;
              return self.msie() && /msie 6./.test(self.ua);
          },
          ie7: function() {
              var self = this;
              return self.msie() && /msie 7.0/.test(self.ua);
          },
          ie8: function() {
              var self = this;
              return self.msie() && /msie 8.0/.test(self.ua);
          },
          ie9: function() {
              var self = this;
              return self.msie() && /msie 9.0/.test(self.ua);
          }
      };

      if(browser.ie6() || browser.ie7() || browser.ie8() || browser.ie9()) {
        window.location.href = 'update.htm';
      } 


