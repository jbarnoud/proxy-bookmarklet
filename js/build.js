/** Get a variable fron the query
 *
 * Return the value of the variable if it is defined or null else.
 *
 * Taken from http://stackoverflow.com/questions/827368/using-the-get-parameter-of-a-url-in-javascript
 */
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
  return null;
}

/** Set the input field content to the value given as query parameter if any
 */
function set_input() {
    var query = getQueryVariable('proxy');
    if (query != null) {
        document.getElementById("url-input").value = query;
        create();
    }
}

/** Set the color and text of the button
 *
 * The 'stat' parameter can be 'success', 'changed', or 'empty'.
 */
function set_button(stat){
    var status_table = {};
    status_table['success'] = ['success', 
        '<span class="glyphicon glyphicon-bookmark"></span> Add proxy'];
    status_table['changed'] = ['warning', 'Hit create'];
    status_table['empty']   = ['danger',  'Type proxy adress'];
    var button = document.getElementById("bookmarklet");
    button.setAttribute("class", "btn btn-lg btn-"+status_table[stat][0]);
    button.innerHTML = status_table[stat][1];
}

/** Set the bookmarklet script in the href attribute of the button
 */
function create() {
    // Get the input from the user
    var proxy_url = document.getElementById("url-input").value;
    if (proxy_url.length > 0) {
        // A proxy URL always starts with a dot, let's add the dot if needed
        if (proxy_url.substring(0, 1) != '.') {
            proxy_url = '.' + proxy_url;
        }
        // Update the proxy url in the bookmarklet
        var template = 'javascript:(function() { var getLocation = function(href) { var l = document.createElement("a"); l.href = href; return l; }; var proxy = "'+proxy_url+'"; var current_url = getLocation(document.URL); var modified_url = "http://" + current_url.hostname + proxy + current_url.pathname; window.location = modified_url; }());';
        var button = document.getElementById("bookmarklet");
        button.setAttribute("href", template);
        // Update button color and text
        set_button('success');
    } else {
        $("#error").show();
    }
}

/** Handle the event when the content of the input field change
 *
 * Set the button to 'change' when the field content change; except if the
 * field is empty, then set the button to 'empty'.
 */
function change() {
    $("#error").hide();
    var proxy_url = document.getElementById("url-input").value;
    if (proxy_url.length == 0) {
        set_button('empty');
    } else {
        set_button('changed');
    }
}

/** Initiate all the events
 */
function main() {
    set_input();
    $("#error").hide();
    document.getElementById("url-input").onkeyup = change;
    document.getElementById("create").onclick = create;
}

window.onload = main;
