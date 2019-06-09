document.addEventListener('DOMContentLoaded', function() {
  var terminal = document.getElementById('terminal');
  var cache=[];
  let idx = 0
  var root='joshuagluck@gMAC-2:~/<span style="color:#FF00FF;">Developer</span> $ ';
  var input;
  var commands={
    ls: function() {
      displayText('<span className=red-heart>>> ls</span><br>')
      displayText('/home<br>');
      displayText('/about<br>');
      displayText('/portfolio<br>');
      displayText('/code_breakdown<br>');
      displayText('/resume<br>');
      displayText('/github<br>');
    },
    ll: function() {
      displayText('<span className=red-heart>>> ll</span><br>')
      displayText('.<br>');
      displayText('..<br>');
      displayText('.bash_profile<br>');
      displayText('.bash_history<br>');
      displayText('<span style="color:grey;">home</span><br>');
      displayText('<span style="color:blue;">about</span><br>');
      displayText('<span style="color:red;">portfolio</span><br>');
      displayText('<span style="color:purple;">code_breakdown</span><br>');
      displayText('<span style="color:green;">resume</span><br>');
      displayText('<span style="color:yellow;">github</span><br>');
    },
    cd: function(directory) {
      directory=(typeof directory!=='undefined') ? directory : null;
      if (!directory) {
        displayText("-bash: cd takes [1] argument <br>");
      } else {
        switch (directory[0]) {
          case '/home':
            displayText(`<span className=red-heart>>> cd ${directory[0]}</span><br>`)
          break;
          case '/about':
          // window.location.href='/about';
            displayText(`<span className=red-heart>>> cd ${directory[0]}</span><br>`)
          break;
          case '/portfolio':
            displayText(`<span className=red-heart>>> cd ${directory[0]}</span><br>`)
          break;
          case '/code_breakdown':
            displayText(`<span className=red-heart>>> cd ${directory[0]}</span><br>`)
          break;
          case '/resume':
            displayText(`<span className=red-heart>>> cd ${directory[0]}</span><br>`)
          break;
          case '/github':
            displayText(`<span className=red-heart>>> cd ${directory[0]}</span><br>`)
            window.location.href='http://github.com/jgluck96';
          break;
          default:
            displayText(`<span className=red-heart>>> cd ${directory[0]}</span><br>-bash: cd: `+directory[0]+": No such file or directory<br>");
          break;
        }
      }
    },
    mailx: function(body) {
      displayText('<span className=red-heart>>> mailx</span><br>');
      window.location.href='mailto:joshgluck1@gmail.com?body=' + body
    },
    help: function() {
      displayText('<span className=red-heart>>> help</span><br>');
      displayText('Available commands:<br>');
      displayText('cd -- change directory ( [cd] [directory ...])<br>');
      displayText('ls -- list directory contents ( [ls] [file ...])<br>');
      displayText('clear<br>');
      displayText('mailx<br>');
      displayText('who<br>');
    },
    h: function() {
      displayText('<span className=red-heart>>> h</span><br>');
      displayText('Available commands:<br>');
      displayText('cd -- change directory ( [cd] [directory ...])<br>');
      displayText('ls -- list directory contents ( [ls] [file ...])<br>');
      displayText('clear<br>');
      displayText('mailx<br>');
      displayText('who<br>');
    },
    who: function() {
      displayText('<span className=red-heart>>> who</span><br>');
      displayText("joshuagluck console  Jul 2, 1996<br>");
    },
    clear: function(){
      terminal.innerHTML='';
    }
  };
  addRootText();
  addInputForm();
  activateCursor();
  document.onkeypress = function(event) {
    if (event.keyCode === 13) {
      cache.push(input.value);
      handleCommand(input.value);
      addRootText();
      addInputForm();
      activateCursor();
      idx = 0
    }
  };

  document.onkeydown = function(event) {
    let last_cache = cache.length - 1
    if (event.keyCode === 38) {
      if (idx >= 0) {
        const last_command = cache[last_cache - idx];
        if (!!last_command) {
          document.getElementById('user_input').value = last_command
          idx += 1
        }
      }
    }
    if (event.keyCode === 40) {
      if (idx === cache.length) {
        idx -= 1
      }

      if (idx <= last_cache && idx > 0) {
        idx -= 1
        const fwd_command = cache[last_cache - idx];
        if (!!fwd_command) {
          document.getElementById('user_input').value = fwd_command
        }
      }
      else {
          document.getElementById('user_input').value = ''
      }
    }
  }


  function handleCommand(command) {
    cleanTerminal();
    const command_list = command.split(' ');
    if (command_list.length>1) {
      command = command_list[0];
      const args = command_list.slice(1);
      executeCommandArgs(command,args);
    } else {
      executeCommandNoArgs(command);
    }
  }

  function addInputForm() {
    input = document.createElement('input');
    input.type='text';
    input.id='user_input';
    input.autocomplete='off';
    terminal.appendChild(input);
  }

  function addRootText() {
    terminal.innerHTML+='<span>'+root+'</span>';
  }

  function displayText(text) {
    terminal.innerHTML+='<span>'+text+'</span>';
  }

  function cleanTerminal() {
    terminal.removeChild(input);
    const newline = document.createElement('br');
    terminal.appendChild(newline);
  };

  function activateCursor() {
    input.focus();
    input.select();
  }

  function executeCommandArgs(command,args) {
    if (command in commands){
      if (typeof(commands[command]) ==='function') {
        commands[command](args);
      }
    } else {
      displayText("-bash: "+command+": command not found<br>");
    }
  };

  function executeCommandNoArgs(command) {
    if (command in commands) {
      if (typeof(commands[command]) === 'function') {
        commands[command]();
      }
    } else {
      displayText("-bash: "+command+": command not found<br>");
    }
  }
})
