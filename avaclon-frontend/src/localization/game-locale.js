import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
  en: {
    adminArea: "Admin Area",
    approveRejectTokens: "Vote Tokens",
    backside: "Cardback",
    blueRedMarkers: "Score Markers",
    characterCards: "Character Cards",
    lady: "Lady of the Lake",
    ladyCards: "Loyalty Cards",
    leaderToken: "Leader Token",
    newGame: "New Game",
    roundMarker: "Round Marker",
    switchLanguage: "Switch Language",
    voteCards: "Quest Cards",
    voteTrackMarker: "Vote Track Marker",

    mission: {
      approve: "Approve",
      current: "Current Mission",
      failure: "Fail",
      reject: "Reject",
      success: "Success",
    },

    roles: {
      evil: "Minion of Mordred",
      evilTeam: "Minions of Mordred",
      good: "Loyal Servant of Arthur",
      goodTeam: "Loyal Servants of Arthur",
      hidden: "Hidden Role",
      merlinOrMorgana: "Merlin or Morgana",
      mordred: "Mordred",
      oberon: "Oberon",
      unknown: "Unknown",
    },
  },
  de: {
    adminArea: "Admin Bereich",
    backside: "Kartenrücken",
    newGame: "Neues Spiel",
    switchLanguage: "Sprache wechseln",

    mission: {
      approve: "Pro",
      current: "Derzeitige Mission",
      failure: "Fehlschlag",
      reject: "Contra",
      success: "Erfolg",
    },

    roles: {
      evil: "Diener Mordreds",
      evilTeam: "Diener Mordreds",
      good: "Loyaler Diener Arthus",
      goodTeam: "Loyale Diener Arthus",
      hidden: "Versteckte Rolle",
      merlinOrMorgana: "Merlin oder Morgana",
      unknown: "Unbekannt",
    },
  }
});

export default strings;