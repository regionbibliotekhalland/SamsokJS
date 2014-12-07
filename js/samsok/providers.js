QUERY_TOKEN = '@QUERY@';

App.ProviderGroup = Ember.Object.extend({
    groupName: null,
    providers: null
});

App.Provider = Ember.Object.extend({
    parser: null,
    baseUrl: null,
    searchUrl: null,
    name: null,
    gotoUrl: null,
    encoding: null,
    enabled: false,

    init: function() {
        this.set('enabled', isProviderEnabled(this.get('name')));
    },

    getSearchUrl: function(query) {
        if (this.get('searchUrl').indexOf(QUERY_TOKEN) >= 0)
            return this.get('searchUrl').replace(QUERY_TOKEN, query);
        else
            return this.get('searchUrl') + query;
    },

    getGotoUrl: function(query) {
        if (!this.get('gotoUrl')) {
            return this.getSearchUrl(query)
            return this.getSearchUrl(query);
        } else {
            if (this.gotoUrl.indexOf(QUERY_TOKEN) >= 0)
                return this.gotoUrl.replace(QUERY_TOKEN, query);
            else
                return this.gotoUrl + query;
        }
    },

    enabledDidChange: function() {
        setProviderEnabled(this.get('name'), this.get('enabled'));
    }.observes('enabled')
});

var providers = [
    App.ProviderGroup.create({
        groupName: 'Testgrupp',
        providers: [
            App.Provider.create({
                parser: XsearchParser,
                baseUrl: 'http://www.sverigesdepabibliotekochlanecentral.se/',
                searchUrl: 'http://libris.kb.se/xsearch?query=@QUERY@%20AND%20bibl:umdp&format=json&holdings=true&n=200',
                name: 'Depåbiblioteket i Umeå',
                gotoUrl: 'http://libris.kb.se/hitlist?q=@QUERY@+bib%3aumdp&d=libris&m=10&p=1&s=r',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: SsbParser,
                baseUrl: 'https://biblioteket.stockholm.se/',
                searchUrl: 'http://biblioteket.stockholm.se/sok?freetext=',
                name: 'Stockholms Stadsbibliotek',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: GotlibParser,
                baseUrl: 'http://encore.gotlib.goteborg.se/',
                searchUrl: 'http://encore.gotlib.goteborg.se/iii/encore/search/C__S@QUERY@__Orightresult__U1?lang=swe&suite=pearl',
                name: 'Göteborg',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: MalmoParser,
                baseUrl: 'http://malmo.stadsbibliotek.org/',
                searchUrl: 'http://malmo.stadsbibliotek.org/search~S7*swe/?SUBMIT=Sök+%3E%3E%searchtype=X&searcharg=',
                name: 'Malmö',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: OlaParser,
                baseUrl: 'http://bibliotek.boras.se/',
                searchUrl: 'http://bibliotek.boras.se/search?query=@QUERY@&searchtype=Biblioteket&sort=Relevance&fLibId=00000000-0000-0000-0000-000000000000',
                name: 'Borås',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: KohaParser,
                baseUrl: 'http://hylte.bibkat.se/',
                searchUrl: 'http://hylte.bibkat.se/cgi-bin/koha/opac-search.pl?q=@QUERY@&branch_group_limit=',
                name: 'Hylte',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: MinabibliotekParser,
                baseUrl: 'http://www.minabibliotek.se/',
                searchUrl: 'http://www.minabibliotek.se/search?query=@QUERY@&sort=Relevance&snabbsokknapp=Sök&searchtype=Biblioteket&fLibId=00000000-0000-0000-0000-000000000000',
                name: 'Minabibliotek',
                encoding: 'utf-8'
            })
        ]
    }),
    App.ProviderGroup.create({
        groupName: 'Libra',
        providers: [
            App.Provider.create({
                parser: LibraParser,
                baseUrl: 'http://opac.laholm.axiell.com/opac/',
                searchUrl: 'http://opac.laholm.axiell.com/opac/search_result.aspx?TextFritext=',
                name: 'Laholm',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: LibraParser,
                baseUrl: 'http://www5.falkenberg.se/opac/opac/',
                searchUrl: 'http://www5.falkenberg.se/opac/opac/search_result.aspx?TextFritext=',
                name: 'Falkenberg',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: LibraParser,
                baseUrl: 'http://bibold.kungsbacka.se/opac/',
                searchUrl: 'http://bibold.kungsbacka.se/opac/search_result.aspx?TextFritext=',
                name: 'Kungsbacka',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: LibraParser,
                baseUrl: 'http://bib.varberg.se/opac/',
                searchUrl: 'http://bib.varberg.se/opac/search_result.aspx?TextFritext=',
                name: 'Varberg',
                encoding: 'utf-8'
            })
        ]
    }),
    App.ProviderGroup.create({
        groupName: 'Mikromarc',
        providers: [
            App.Provider.create({
                parser: MicroMarcParser,
                baseUrl: 'http://webbsok.mikromarc.se/Mikromarc3/web/',
                searchUrl: 'http://webbsok.mikromarc.se/Mikromarc3/web/search.aspx?Unit=6471&db=bollebygd-fb&SC=FT&SW=@QUERY@&LB=FT&IN=&SU=19116&',
                name: 'Bollebygd',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: MicroMarcParser,
                baseUrl: 'http://webbsok.mikromarc.se/Mikromarc3/web/',
                searchUrl: 'http://webbsok.mikromarc.se/Mikromarc3/Web/search.aspx?Unit=6469&db=vargarda&SC=FT&SW=@QUERY@&LB=FT&IN=&SU=0&',
                name: 'Vårgårda',
                encoding: 'utf-8'
            })
        ]
    }),
    App.ProviderGroup.create({
        groupName: 'Arena',
        providers: [
            App.Provider.create({
                parser: ArenaParser,
                baseUrl: '',
                searchUrl: 'http://bibliotek.mark.se/web/arena/search?p_p_state=normal&p_p_lifecycle=1&p_p_action=1&p_p_id=searchResult_WAR_arenaportlets&p_p_col_count=4&p_p_col_id=column-1&p_p_col_pos=1&p_p_mode=view&search_item_no=0&search_type=solr&search_query=',
                name: 'Mark',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: ArenaParser,
                baseUrl: '',
                searchUrl: 'http://www.falkopingsbibliotek.se/web/arena/search?p_p_state=normal&p_p_lifecycle=1&p_p_action=1&p_p_id=searchResult_WAR_arenaportlets&p_p_col_count=4&p_p_col_id=column-1&p_p_mode=view&facet_queries=&search_item_no=0&search_type=solr&search_query=',
                name: 'Falköping',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: ArenaParser,
                baseUrl: '',
                searchUrl: 'http://biblioteken.vara.se/web/pub/search?p_p_state=normal&p_p_lifecycle=1&p_p_action=1&p_p_id=searchResult_WAR_arenaportlets&p_p_col_count=3&p_p_col_id=column-1&p_p_col_pos=1&p_p_mode=view&facet_queries=&search_item_no=0&search_type=solr&search_query=',
                name: 'Vara',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: ArenaParser,
                baseUrl: '',
                searchUrl: 'http://bibliotek.halmstad.se/web/arena/search?p_p_state=normal&p_p_lifecycle=1&p_p_action=1&p_p_id=searchResult_WAR_arenaportlets&p_p_col_count=11&p_p_col_id=column-1&p_p_mode=view&search_item_no=0&search_type=solr&search_query=',
                name: 'Halmstad',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: ArenaParser,
                baseUrl: '',
                searchUrl: 'http://bibliotek.jonkoping.se/web/arena/search?p_p_state=normal&p_p_lifecycle=1&p_p_action=1&p_p_id=searchResult_WAR_arenaportlets&p_p_col_count=4&p_p_col_id=column-1&p_p_col_pos=3&p_p_mode=view&facet_queries=&search_item_no=0&search_type=solr&search_query=',
                name: 'Jönköping',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: ArenaParser,
                baseUrl: '',
                searchUrl: 'http://bookitpub.kalmar.se/web/pub/search?p_p_state=normal&p_p_lifecycle=1&p_p_action=1&p_p_id=searchResult_WAR_arenaportlets&p_p_col_count=3&p_p_col_id=column-1&p_p_col_pos=1&p_p_mode=view&facet_queries=&search_item_no=0&search_type=solr&search_query=',
                name: 'Kalmar',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: ArenaParser,
                baseUrl: '',
                searchUrl: 'http://bibliotek.karlskrona.se/web/arena/search?p_p_state=normal&p_p_lifecycle=1&p_p_action=1&p_p_id=searchResult_WAR_arenaportlets&p_p_col_count=5&p_p_col_id=column-2&p_p_mode=view&facet_queries=&search_item_no=0&search_type=solr&search_query=',
                name: 'Karlskrona',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: ArenaParser,
                baseUrl: '',
                searchUrl: 'http://bookitpub.bibliotekskno.se/web/pub/search?p_p_state=normal&p_p_lifecycle=1&p_p_action=1&p_p_id=searchResult_WAR_arenaportlets&p_p_col_count=3&p_p_col_id=column-1&p_p_col_pos=1&p_p_mode=view&facet_queries=&search_item_no=0&search_type=solr&search_query=',
                name: 'SkåneNO',
                encoding: 'utf-8'
            }),
            App.Provider.create({
                parser: ArenaParser,
                baseUrl: '',
                searchUrl: 'http://bibliotek.vaxjo.se/web/arena/search?p_p_state=normal&p_p_lifecycle=1&p_p_action=1&p_p_id=searchResult_WAR_arenaportlets&p_p_col_count=4&p_p_col_id=column-1&p_p_col_pos=2&p_p_mode=view&facet_queries=&search_item_no=0&search_type=solr&search_query=',
                name: 'Växjö',
                encoding: 'utf-8'
            }),
        ]
    })
];

function isMsie() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
        return true;
    else
        return false;
}

$.cookie.json = true;

// Use cookies for MSIE, localStorage otherwise when available. This is because MSIE won't allow localStorage when running on
// file://, and Chrome won't allow cookies when running from file://

function getDisabledProviders() {
    if (isMsie() || !Modernizr.localstorage)
        return $.cookie('disabledProviders') || [];
    else {
        return JSON.parse(window.localStorage["disabledProviders"]) || [];
    }
}

function setDisabledProviders(disabledProviders) {
    if (isMsie() || !Modernizr.localstorage)
        $.cookie('disabledProviders', disabledProviders);
    else {
        window.localStorage['disabledProviders'] = JSON.stringify(disabledProviders);
    }
}

function isProviderEnabled(provider) {
    var disabledProviders = getDisabledProviders();
    return disabledProviders.indexOf(provider) == -1;
}

function setProviderEnabled(provider, enabled) {
    var disabledProviders = getDisabledProviders();

    if (!enabled) {
        if (disabledProviders.indexOf(provider) == -1) {
            disabledProviders.push(provider);
        }
    } else {
        if (disabledProviders.indexOf(provider) != -1) {
            disabledProviders.splice(disabledProviders.indexOf(provider), 1);
        }
    }

    setDisabledProviders(disabledProviders);
}
