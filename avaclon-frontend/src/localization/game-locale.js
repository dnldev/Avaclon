import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
  en: {
    approveMission: "Approve",
    approveRejectTokens: "Vote Tokens",
    blueRedMarkers: "Score Markers",
    characterCards: "Character Cards",
    characterCards: "characterCards",
    currentMission: "Current Mission",
    lady: "Lady of the Lake",
    ladyCards: "Loyalty Cards",
    leaderToken: "Leader Token",
    missionFailure: "Fail",
    missionSuccess: "Success",
    newGame: "New Game",
    rejectMission: "Reject",
    roundMarker: "Round Marker",
    switchLanguage: "Switch Language",
    voteCards: "Quest Cards",
    voteTrackMarker: "Vote Track Marker",

    roles: {
      evil: "Minion of Mordred",
      evilTeam: "Minions of Mordred",
      good: "Loyal Servant of Arthur",
      goodTeam: "Loyal Servants of Arthur",
      merlinOrMorgana: "Merlin or Morgana",
      mordred: "Mordred",
      oberon: "Oberon",
      unknown: "Unknown",
    },
  },
  de: {
    currentMission: "Derzeitige Mission",
    missionFailure: "Fehlschlag",
    missionSuccess: "Erfolg",
    newGame: "Neues Spiel",
    switchLanguage: "Sprache wechseln",

    roles: {
      evil: "Diener Mordreds",
      evilTeam: "Diener Mordreds",
      good: "Loyaler Diener Arthus",
      goodTeam: "Loyale Diener Arthus",
      merlinOrMorgana: "Merlin oder Morgana",
      unknown: "Unbekannt",
    },
  }
});

export default strings;