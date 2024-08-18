if test -f /etc/profile.d/git-sdk.sh
then
	TITLEPREFIX=SDK-${MSYSTEM#MINGW}
else
	TITLEPREFIX=$MSYSTEM
fi

if test -f ~/.config/git/git-prompt.sh
then
	. ~/.config/git/git-prompt.sh
else
	PS1='\[\033]0;$TITLEPREFIX:$PWD\007\]'  # set window title
	PS1="$PS1"'\[\033[32m\]'               # change to green
	PS1="$PS1"'pldz@ '                     # set your custom user@host<space>
	PS1="$PS1"'\[\033[35m\]'               # change to purple
	PS1="$PS1"'$MSYSTEM '                  # show MSYSTEM
	PS1="$PS1"'\[\033[33m\]'               # change to brownish yellow
	PS1="$PS1"'$PWD'                       # current working directory
	PS1="$PS1"'\[\033[36m\]'               # change color to cyan

	if test -n "$VIRTUAL_ENV"; then
		VENV_NAME=$(basename "$VIRTUAL_ENV")
		PS1="$PS1"'\[\033[36m\]('$VENV_NAME') '  # add venv info in cyan
	fi

	if test -z "$WINELOADERNOEXEC"; then
		GIT_EXEC_PATH="$(git --exec-path 2>/dev/null)"
		COMPLETION_PATH="${GIT_EXEC_PATH%/libexec/git-core}"
		COMPLETION_PATH="${COMPLETION_PATH%/lib/git-core}"
		COMPLETION_PATH="$COMPLETION_PATH/share/git/completion"
		if test -f "$COMPLETION_PATH/git-prompt.sh"; then
			. "$COMPLETION_PATH/git-completion.bash"
			. "$COMPLETION_PATH/git-prompt.sh"
			PS1="$PS1"'`__git_ps1`'  # bash function for git branch
		fi
	fi

	PS1="$PS1"'\[\033[0m\]'  # reset color
	PS1="$PS1"' $ '         # prompt symbol
fi

MSYS2_PS1="$PS1"               # for detection by MSYS2 SDK's bash.basrc

# Evaluate all user-specific Bash completion scripts (if any)
if test -z "$WINELOADERNOEXEC"
then
	for c in "$HOME"/bash_completion.d/*.bash
	do
		# Handle absence of any scripts (or the folder) gracefully
		test ! -f "$c" ||
		. "$c"
	done
fi
