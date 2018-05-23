import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
  en: {
    approveMission: "Approve",
    approveRejectTokens: "Vote Tokens",
    blueRedMarkers: "Score Markers",
    characterCards: "Character Cards",
    characterCards: "characterCards",
    currentMission: "Current Mission",
    evilTeam: "Minions of Mordred",
    genericBlue: "Loyal Servant of Arthur",
    genericRed: "Minion of Mordred",
    goodTeam: "Loyal Servants of Arthur",
    lady: "Lady of the Lake",
    ladyCards: "Loyalty Cards",
    leaderToken: "Leader Token",
    missionFailure: "Fail",
    missionSuccess: "Success",
    mordred: "Mordred",
    newGame: "New Game",
    rejectMission: "Reject",
    role: "Role",
    roundMarker: "Round Marker",
    switchLanguage: "Switch Language",
    voteCards: "Quest Cards",
    voteTrackMarker: "Vote Track Marker",

    roles: {
      evil: "Evil",
      good: "Good",
      oberon: "Oberon",
      parcivalCandidate: "Merlin or Morgana",
      unknown: "Unknown",
    },
  },
  de: {
    currentMission: "Derzeitige Mission",
    missionFailure: "Fehlschlag",
    missionSuccess: "Erfolg",
    newGame: "Neues Spiel",
    role: "Rolle",
    switchLanguage: "Sprache wechseln",

    roles: {
      evil: "Böse",
      good: "Gut",
      parcivalCandidate: "Merlin oder Morgana",
      unknown: "Unbekannt",
    },
  }
});

export default strings;