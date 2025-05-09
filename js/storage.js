function savePatientsToLocalStorage(patients) {
    localStorage.setItem('patients', JSON.stringify(patients));
}

function getPatientsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('patients')) || [];
}
export {savePatientsToLocalStorage, getPatientsFromLocalStorage};
