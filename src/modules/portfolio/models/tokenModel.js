class TokenModel {
    constructor({
        address,
        name,
        shortName,
        value,
        history = null,
        holders = null,
    }) {
        this.address = address;
        this.name = name;
        this.shortName = shortName;
        this.value = value;
        this.history = history || [];
        this.holders = holders || [];
    }
}

export default TokenModel;
