export async function setup( context ) {
  
  let $logs = $('<div>').addClass('kloppie-console-logs');
  $logs.hide();
  $('#m-page-loader').after($logs);

  let logs = [];
  let max_log = 10;

  const newLog = ( args ) => {
	  let message = "";
    args.forEach((arg) => {
      if (typeof arg === 'object')
        message += JSON.stringify(arg);
      else
        message += arg.toString();
      message += ' ';
    });

    const $message = $('<div>')
      .addClass('kloppie-console-log-message')
      .html(message.replace(/\n/g, '<br />'));
  
    $logs.append($message);

    logs.push({ message: message, display: $message });
    if (logs.length > max_log) {
      old_log = logs.shift();
      old_log.display.remove();
    }
  };
  
  console.defaultLog = console.log.bind(console);
  console.log = function (...args) {
    newLog(args);
    console.defaultLog.apply(console, args);
  };
  
  sidebar.category('Modding').item('Console', {
    onClick: () => $logs.toggle(),
  });
}
