export const validate = (value) => {
    // const { fields } = this.state
    if (!value) {
        return <p style={{ color: 'red' }}>Field  is required !!</p>
    }

    if (value?.length < 3 || value?.length > 11) {
        return <p style={{ color: 'red' }}>Atlest 3 TO 10 latter is required</p>;
    }

}
export const undoHnadler = (value) => {
    // const { fields } = this.state
    console.log("🚀 ~ file: validation.js:10 ~ undoHnadler ~ value", value)
    if (value === undefined) {
        return;
    } else {

        const undoDaata = value.name;
        console.log("🚀 ~ file: validation.js:13 ~ undoHnadler ~ undoDaata", undoDaata)
        return undoDaata;
    }

}
