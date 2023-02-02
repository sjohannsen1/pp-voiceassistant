<!DOCTYPE html>
<html lang="de-DE">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="/pp-voiceassistant/assets/css/main.css">
    <link rel="stylesheet" href="/pp-voiceassistant/assets/css/font-awesome.min.css">

    <link rel="shortcut icon" href="/pp-voiceassistant/favicon.ico?1">
    <!-- Begin Jekyll SEO tag v2.5.0 -->
<title>Anleitung | Praxisprojekt Sprachassistent</title>
<meta name="generator" content="Jekyll v3.8.5" />
<meta property="og:title" content="Anleitung" />
<meta property="og:locale" content="de_DE" />
<meta name="description" content="Einrichtung des Raspberry Pis" />
<meta property="og:description" content="Einrichtung des Raspberry Pis" />
<link rel="canonical" href="http://localhost:4000/pp-voiceassistant/docs/installation/instructions.md" />
<meta property="og:url" content="http://localhost:4000/pp-voiceassistant/docs/installation/instructions.md" />
<meta property="og:site_name" content="Praxisprojekt Sprachassistent" />
<meta property="og:type" content="article" />
<meta property="article:published_time" content="2023-02-02T18:00:49+01:00" />
<script type="application/ld+json">
{"description":"Einrichtung des Raspberry Pis","url":"http://localhost:4000/pp-voiceassistant/docs/installation/instructions.md","@type":"WebPage","headline":"Anleitung","dateModified":"2023-02-02T18:00:49+01:00","datePublished":"2023-02-02T18:00:49+01:00","@context":"http://schema.org"}</script>
<!-- End Jekyll SEO tag -->


    <link rel="alternate" type="application/rss+xml" title="Praxisprojekt Sprachassistent" href="http://localhost:4000/pp-voiceassistant/feed.xml" />
</head>


<body>

    <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container navbar-container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
            <a class="navbar-brand" href="/pp-voiceassistant/">
                <span><img src="/pp-voiceassistant/assets/img/logonav.png" alt="Logo"></span> Praxisprojekt Sprachassistent
            </a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li  class="active" ><a href="/pp-voiceassistant/docs/home/">Docs</a></li>
<!--                <li ><a href="">Blog</a></li>-->
            </ul>
            <div class="navbar-right">
<!--                <form class="navbar-form navbar-left">-->
<!--                    <div class="form-group has-feedback">-->
<!--                        <input id="search-box" type="search" class="form-control" placeholder="Search...">-->
<!--                        <i class="fa fa-search form-control-feedback"></i>-->
<!--                    </div>-->
<!--                </form>-->
                <ul class="nav navbar-nav">
                    <li><a href="https://github.com/sjohannsen1/pp-voiceassistant"><i class="fa fa-github" aria-hidden="true"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
</nav>


    <div class="page-content">
        <div class="wrapper">
            <div class="container">
    <div class="row">
        <div class="col-md-4">
          <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse-1" aria-expanded="false" aria-controls="collapse-1">
            Willkommen
          </a>
        </h4>
      </div>
      
      
      <div class="panel-collapse collapse" id="collapse-1" role="tabpanel" aria-label="Side Navigation">
        <div class="list-group">
          
            
            
            <a class="list-group-item " href="/pp-voiceassistant/docs/home/">Willkommen</a>
          
        </div>
      </div>
    </div>
  
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
            Installation
          </a>
        </h4>
      </div>
      
      
      <div class="panel-collapse collapse" id="collapse-2" role="tabpanel" aria-label="Side Navigation">
        <div class="list-group">
          
            
            
            <a class="list-group-item " href=""></a>
          
            
            
            <a class="list-group-item " href=""></a>
          
            
            
            <a class="list-group-item " href=""></a>
          
            
            
            <a class="list-group-item " href="/pp-voiceassistant/docs/installation/Zigbee2MQTT/">Installation Zigbee2MQTT</a>
          
        </div>
      </div>
    </div>
  
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse-3" aria-expanded="false" aria-controls="collapse-3">
            Skills
          </a>
        </h4>
      </div>
      
      
      <div class="panel-collapse collapse" id="collapse-3" role="tabpanel" aria-label="Side Navigation">
        <div class="list-group">
          
            
            
            <a class="list-group-item " href=""></a>
          
            
            
            <a class="list-group-item " href=""></a>
          
            
            
            <a class="list-group-item " href=""></a>
          
            
            
            <a class="list-group-item " href=""></a>
          
            
            
            <a class="list-group-item " href=""></a>
          
            
            
            <a class="list-group-item " href=""></a>
          
            
            
            <a class="list-group-item " href=""></a>
          
        </div>
      </div>
    </div>
  
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse-4" aria-expanded="false" aria-controls="collapse-4">
            Fazit
          </a>
        </h4>
      </div>
      
      
      <div class="panel-collapse collapse" id="collapse-4" role="tabpanel" aria-label="Side Navigation">
        <div class="list-group">
          
            
            
            <a class="list-group-item " href="/pp-voiceassistant/docs/conclusion/conclusion/">Fazit</a>
          
        </div>
      </div>
    </div>
  
</div>

        </div>

        <div class="col-md-8">
            <h1>Anleitung</h1>
            <div id="markdown-content-container"><h2 id="einrichtung-des-raspberry-pis">Einrichtung des Raspberry Pis</h2>

<p>Zunächst kann der Installationsanleitung von <a href="https://fwehn.github.io/pp-voiceassistant/docs/installation/">Finn Wehn</a> gefolgt werden. Allerdings müssen dabei ein paar Dinge beachtet werden. 
Es wird mit einer SD-Karte mit der 32 Bit Version des Raspberry Pi OS gestartet. Falls bei der Installation des Betriebsystems der Standardnutzer <code class="language-plaintext highlighter-rouge">pi</code> geändert wurde, müssen bei der weitergehenden Installation ein paar Dinge angepasst werden. Diese sind markiert.
Die SD-Karte wird in den Raspberry Pi gesteckt und dieser dann gestartet. Ist dieser mit einem Netzwerk verbunden, kann sich nun mit einem Computer per SSH verbunden werden. <a href="https://www.ssh.com/academy/ssh#the-ssh-protocol">SSH</a>, oder auch Secure Shell, ist ein Netzwerkprotokoll, mit welchem auf das Terminal des Pis zugegriffen werden kann. Alternativ kann auch ein Bildschirm, eine Maus und eine Tastatur angeschlossen und ein Terminal direkt auf dem Pi geöffnet werden. <br />
Darüber müssen auf dem Pi ein MQTT-Broker, in diesem Fall <a href="https://mosquitto.org/">Mosquitto</a>, eine Rhasspy-Instanz, die Laufzeit-Umgebung <a href="https://nodejs.org/de/">NodeJS</a> und <a href="https://git-scm.com/download/linux">Git</a> installiert werden.</p>

<h2 id="rhasspy">Rhasspy</h2>

<p>Falls der Standardnutzer des Raspberry Pi geändert wurde, muss der Nutzer zur “audio” Gruppe hinzugefügt werden. Dazu kann dieser Befehl in einem Terminal eingegeben werden: <code class="language-plaintext highlighter-rouge">sudo usermod -a -G audio NUTZERNAME</code><br />
Bei der Installation der <a href="https://rhasspy.readthedocs.io/en/latest/installation/">Rhasspy-Instanz</a> muss beachtet werden, dass diese in der richtigen Sprache vorgenommen wird. In diesem Fall ist das Deutsch. Außerdem muss Zugriff auf den MQTT-Broker gewährleistet werden. <a href="https://rhasspy.readthedocs.io/en/latest/tutorials/#simple-skill">Von Rhasspy wird empfohlen</a>, dafür den Docker-Container im Host-Networking-Modus laufen zu lassen. Dadurch teilt sich der Docker-Container einen Namensraum mit dem restlichen System und kann so ohne weitere Konfiguration auf den MQTT-Broker via dessen Port zugreifen.<br />
Der Befehl zum Starten des Rhasspy Docker Images lautet somit:</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code> $ docker run -d -p 12101:12101 \
      --network host \
      --name rhasspy \
      --restart unless-stopped \
      -v "$HOME/.config/rhasspy/profiles:/profiles" \
      -v "/etc/localtime:/etc/localtime:ro" \
      --device /dev/snd:/dev/snd \
      rhasspy/rhasspy \
      --user-profiles /profiles \
      --profile de 
</code></pre></div></div>
<h3 id="einstellungen-von-rhasspy">Einstellungen von Rhasspy</h3>

<p>Bei Rhasspy müssen einige Dinge eingestellt werden. Dazu wird die Weboberfläche auf Port 12101 aufgerufen.</p>

<ol>
  <li>MQTT: External <br /> 
In den Einstellungen muss dann der Host und der Port des MQTT-Brokers angeben werden. Wenn nichts an dieser Anleitung geändert wurde sind das <code class="language-plaintext highlighter-rouge">localhost</code> und <code class="language-plaintext highlighter-rouge">1883</code>.</li>
  <li>Audio Recording: PyAudio</li>
  <li>Wake Word: Porcupine <br />
Das genaue Wake Word kann frei aus einer Liste gewählt werden</li>
  <li>Speech to Text: Kaldi</li>
  <li>Intent Recognition: Fsticuffs <br />
Die Einstellung “fuzzy” muss hier aktiviert werden.</li>
  <li>Text to Speech: NanoTTS</li>
  <li>Audio Playing: aplay</li>
  <li>Dialogue Management: Rhasspy</li>
  <li>Intent Handling: Local Command</li>
</ol>

<h2 id="installation-des-systems">Installation des Systems</h2>

<p>Dann muss dieses Projekt installiert werden. Die einfachste Methode dafür ist, das Repository zu klonen. Wenn dies geklont ist, muss nur noch in den einzelnen Ordnern, also dem Discord Client, der Custom SDK, dem Client und, falls gewollt, dem Server, jeweils der Befehlt ‘npm install’ durchgeführt werden.</p>

<h3 id="einrichtung-des-skillverwaltungssystems">Einrichtung des Skillverwaltungssystems</h3>

<p>Das Skillverwaltungssystem muss vor Inbetriebnahme noch eingerichtet werden. Dazu müssen Umgebungsvariablen festgelegt werden. Für den Client sind es <a href="https://fwehn.github.io/pp-voiceassistant/docs/installation/#Env-Variablen">diese</a> und für den Server <a href="https://fwehn.github.io/pp-voiceassistant/docs/installation/#Env-Variablen">diese</a>.</p>

<p>Um die Skills zu installieren, müssen diese auf dem Pi hochgeladen und aktiviert werden. Dazu kann der Skillmanager entweder über die <a href="https://fwehn.github.io/pp-voiceassistant/docs/client/webinterface/">Weboberfläche</a> oder über die <a href="https://fwehn.github.io/pp-voiceassistant/docs/client/cli/">Befehlszeilenschnittstelle</a> verwendet werden. Alternativ kann dies auch <a href="https://fwehn.github.io/pp-voiceassistant/docs/client/skillmanager/">manuell</a> direkt auf dem Pi vorgenommen werden.</p>

<h3 id="einrichtung-des-discord-clients">Einrichtung des Discord Clients</h3>

<p>Zunächst muss eine neue <a href="https://discord.com/developers">Anwendung erstellt</a> werden. Dazu wird ein Discord-Account benötigt. Durch einen Klick auf „New  Application“ öffnet sich ein Menü, in welchem die Applikation benannt wird. Wenn dort alles ausgefüllt ist, kann mit „Create“ bestätigt werden. Daraufhin öffnet sich eine neue Seite, auf der nichts eingegeben werden muss. Nun wird der Bot erstellt. Dafür wird im Menü links die Schaltfläche „Bot“ angeklickt.  Durch Auswahl von „Add Bot“ und anschließendem Bestätigen wird ein neuer Bot erstellt. Diese benötigt nun ein paar Berechtigungen. Diese befinden sich unten auf der Seite unter „Privileged Gateway Intents“. Nötig ist hier „Message Content Intent“. Ohne diese kann der Bot keine Nachrichten lesen. Um mit dem Bot nun interagieren zu können, muss dieser zu einem Server hinzugefügt werden. Zuerst wird der OAuth2 URL Generator genutzt um eine URL (Uniform Resource Locator) zu erzeugen. Hier müssen nun genauere Berechtigungen vergeben werden. Dazu zunächst unter „Scopes“ Bot auswählen. Dann die Berechtigungen „Send Messages“, „Create Private Threads“ und „Send Messages in Threads“  auswählen und die generierte URL kopieren.</p>

<h4 id="server-erstellen">Server erstellen</h4>

<p>Ein Server kann in der <a href="https://discord.com/channels/@me">Browserapplikation</a> von Discord erzeugt werden. Dafür links auf den Kreis mit dem Plus klicken, dem Server einen Namen geben und schon existiert dieser Server. Um den Bot nun dort einzuladen, muss nur die URL aufgerufen werden und der Server ausgewählt und bestätigt werden.</p>

<h4 id="bot-mit-code-versehen">Bot mit Code versehen</h4>

<p>Auf der Seite des Bots [https://discord.com/developers/applications -&gt; Applikation -&gt; Bot] befindet sich die Schaltfläche „Reset Token“. Wenn auf diese geklickt und bestätigt wird erscheint das Token. Das ist das Passwort des Bots. Dieses nun kopieren und dann als Umgebungsvariable im Ordner des Bots in einer „.env“ Datei speichern.
Wenn nun mit ‘npm start’ der Bot Client gestartet wird, loggt sich der Bot ein und wartet auf Nachrichten.</p>

<h2 id="inbetriebnahme-des-systems">Inbetriebnahme des Systems</h2>

<p>Um das System zu starten, muss nun im Ordner des Clients der Befehl <code class="language-plaintext highlighter-rouge">npm start</code> ausgeführt werden. Bei Verwendung des Servers in dessen Ordner auch. 
Wird der Discord Bot verwendet muss dort das Gleiche geschehen.</p>

<h3 id="autostart-der-systemteile">Autostart der Systemteile</h3>

<p>Soll das System direkt mit dem Starten des Raspberry Pis starten, //TODO</p>
</div>
            <div style="clear:both;">
              <p class="text-center">
                <br />
                <a target="_blank" href="https://github.com/sjohannsen1/pp-voiceassistant/tree/main/docs/_docs/installation/instructions.md" class="btn btn-default" role="button">
                  <i class="fa fa-pencil fa-lg"></i> Improve this page
                </a>
              </p>
            </div>
            <hr>
            





  
  

  
  

  
  

  
  

  
  

  
  

  
  

  
  

  
  

  
  

  
  

  
  

  
  


        </div>

    </div>
</div>

        </div>
    </div>

    <footer class="footer">
    <div class="container">

        <p class="text-center">
            Praxisprojekt Sprachassistent 2023 |
            Powered by <a href="https://github.com/aksakalli/jekyll-doc-theme">Jekyll Doc Theme</a>
        </p>
        <!-- <p class="text-muted">Place sticky footer content here.</p> -->
    </div>
</footer>

    <script>
  var baseurl = '/pp-voiceassistant'
</script>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="/pp-voiceassistant/assets/js/bootstrap.min.js "></script>
<script src="/pp-voiceassistant/assets/js/typeahead.bundle.min.js "></script>

<script src="/pp-voiceassistant/assets/js/main.js "></script>

</body>

</html>
