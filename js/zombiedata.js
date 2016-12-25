var defaultZombieStateData = {
    "states": {
        "0": {
            "US-AL": 0,
            "US-AK": 0,
            "US-AZ": 0,
            "US-AR": 0,
            "US-CA": 0,
            "US-CO": 0,
            "US-CT": 0,
            "US-DE": 0,
            "US-DC": 0,
            "US-FL": 0,
            "US-GA": 0,
            "US-HI": 0,
            "US-ID": 0,
            "US-IL": 0,
            "US-IN": 0,
            "US-IA": 0,
            "US-KS": 0,
            "US-KY": 0,
            "US-LA": 0,
            "US-ME": 0,
            "US-MD": 0,
            "US-MA": 0,
            "US-MI": 0,
            "US-MN": 0,
            "US-MS": 0,
            "US-MO": 0,
            "US-MT": 0,
            "US-NE": 0,
            "US-NV": 0,
            "US-NH": 0,
            "US-NJ": 0,
            "US-NM": 0,
            "US-NY": 0,
            "US-NC": 0,
            "US-ND": 0,
            "US-OH": 0,
            "US-OK": 0,
            "US-OR": 0,
            "US-PA": 0,
            "US-RI": 0,
            "US-SC": 0,
            "US-SD": 0,
            "US-TN": 0,
            "US-TX": 0,
            "US-UT": 0,
            "US-VT": 0,
            "US-VA": 0,
            "US-WA": 0,
            "US-WV": 0,
            "US-WI": 0,
            "US-WY": 0
        }
    }
};


var stateNeigthbors = {
    "US-WA": ["US-ID", "US-OR"],
    "US-DE": ["US-MD", "US-NJ", "US-PA"],
    "US-DC": ["US-MD", "US-VA"],
    "US-WI": ["US-IA", "US-IL", "US-MI", "US-MN"],
    "US-WV": ["US-KY", "US-MD", "US-OH", "US-PA", "US-VA"],
    "US-FL": ["US-AL", "US-GA"],
    "US-WY": ["US-CO", "US-ID", "US-MT", "US-NE", "US-SD", "US-UT"],
    "US-NH": ["US-MA", "US-ME", "US-VT"],
    "US-NJ": ["US-DE", "US-NY", "US-PA"],
    "US-NM": ["US-AZ", "US-CO", "US-OK", "US-TX", "US-UT"],
    "US-TX": ["US-AR", "US-LA", "US-NM", "US-OK"],
    "US-LA": ["US-AR", "US-MS", "US-TX"],
    "US-NC": ["US-GA", "US-SC", "US-TN", "US-VA"],
    "US-ND": ["US-MN", "US-MT", "US-SD"],
    "US-NE": ["US-CO", "US-IA", "US-KS", "US-MO", "US-SD", "US-WY"],
    "US-TN": ["US-AL", "US-AR", "US-GA", "US-KY", "US-MO", "US-MS", "US-NC", "US-VA"],
    "US-NY": ["US-CT", "US-MA", "US-NJ", "US-PA", "US-VT"],
    "US-PA": ["US-DE", "US-MD", "US-NJ", "US-NY", "US-OH", "US-WV"],
    "US-RI": ["US-CT", "US-MA"],
    "US-NV": ["US-AZ", "US-CA", "US-ID", "US-OR", "US-UT"],
    "US-VA": ["US-DC", "US-KY", "US-MD", "US-NC", "US-TN", "US-WV"],
    "US-CO": ["US-AZ", "US-KS", "US-NE", "US-NM", "US-OK", "US-UT", "US-WY"],
    "US-CA": ["US-AZ", "US-NV", "US-OR"],
    "US-AL": ["US-FL", "US-GA", "US-MS", "US-TN"],
    "US-AR": ["US-LA", "US-MO", "US-MS", "US-OK", "US-TN", "US-TX"],
    "US-VT": ["US-MA", "US-NH", "US-NY"],
    "US-IL": ["US-IA", "US-IN", "US-KY", "US-MO", "US-WI"],
    "US-GA": ["US-AL", "US-FL", "US-NC", "US-SC", "US-TN"],
    "US-IN": ["US-IL", "US-KY", "US-MI", "US-OH"],
    "US-IA": ["US-MN", "US-MO", "US-NE", "US-SD", "US-WI", "US-IL"],
    "US-MA": ["US-CT", "US-NH", "US-NY", "US-RI", "US-VT"],
    "US-AZ": ["US-CA", "US-CO", "US-NM", "US-NV", "US-UT"],
    "US-ID": ["US-MT", "US-NV", "US-OR", "US-UT", "US-WA", "US-WY"],
    "US-CT": ["US-MA", "US-NY", "US-RI"],
    "US-ME": ["US-NH"],
    "US-MD": ["US-DC", "US-DE", "US-PA", "US-VA", "US-WV"],
    "US-OK": ["US-AR", "US-CO", "US-KS", "US-MO", "US-NM", "US-TX"],
    "US-OH": ["US-IN", "US-KY", "US-MI", "US-PA", "US-WV"],
    "US-UT": ["US-AZ", "US-CO", "US-ID", "US-NM", "US-NV", "US-WY"],
    "US-MO": ["US-AR", "US-IA", "US-IL", "US-KS", "US-KY", "US-NE", "US-OK", "US-TN"],
    "US-MN": ["US-IA", "US-ND", "US-SD", "US-WI"],
    "US-MI": ["US-IN", "US-OH", "US-WI"],
    "US-KS": ["US-CO", "US-MO", "US-NE", "US-OK"],
    "US-MT": ["US-ID", "US-ND", "US-SD", "US-WY"],
    "US-MS": ["US-AL", "US-AR", "US-LA", "US-TN"],
    "US-SC": ["US-GA", "US-NC"],
    "US-KY": ["US-IL", "US-IN", "US-MO", "US-OH", "US-TN", "US-VA", "US-WV"],
    "US-OR": ["US-CA", "US-ID", "US-NV", "US-WA"],
    "US-SD": ["US-IA", "US-MN", "US-MT", "US-ND", "US-NE", "US-WY"],
    "US-HI": [],
    "US-AK": []
};
