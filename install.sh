#!/bin/bash
echo "Willkommen beim Installationsprogramm des Skillmanagers"

cd src/sdk || return
npm install

echo "Client Installieren? (j/n): "
read -r a
if [ "$a" = "j" ]
    then
    cd ../client || return
    npm install
elif [ "$a" = "n" ]
    then
    echo "Ok, Client wird nicht installiert"
fi

echo "Server Installieren? (j/n): "
read -r b
if [ "$b" = "j" ]
    then
    cd ../server || return
    npm install
elif [ "$b" = "n" ]
    then
    echo "Ok, Server wird nicht installiert"
fi

echo "Discord Bot Installieren? (j/n): "
read -r c
if [ "$c" = "j" ]
    then
    cd ../discord_client || return
    npm install
elif [ "$c" = "n" ]
    then
    echo "Ok, Discord Bot wird nicht installiert"
fi

echo "Alles Installiert!"