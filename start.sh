#!/bin/bash
echo "Hier können Programmteile gestartet werden"

echo "Soll der Server gestartet werden? (j/n) "
read -r a

if [ "$a" = "j" ] 
    then 
    cd src/server || return
    npm run start || echo "der server ist nicht installiert" >&2
    exit 
fi

echo "Soll Client gestartet werden? (j/n)"
read -r b

if [ "$b" = "j" ] 
    then 
    cd src/client || return
    npm run --silent start || echo "der client ist nicht installiert">&2
    exit
fi

echo "Soll der Discord Bot gestartet werden? (j/n)"
read -r c

if [ "$c" = "j" ] 
    then 
    cd src/discord_client || cd ../discord_client
    npm run --silent start || echo "der Discord Bot ist nicht installiert">&2
    exit 
fi
