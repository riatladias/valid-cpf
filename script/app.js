class ValidaCpf {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfEnviado', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, ''),
        })
    }

    valido() {
        if (typeof this.cpfEnviado === 'undefined') return false;
        if (this.cpfEnviado.length !== 11) return false;
        if (this.isSequence()) return false;
        const cpfParcial = this.cpfEnviado.slice(0, -2);
        const digito1 = this.criaDigito(cpfParcial);
        const digito2 = this.criaDigito(cpfParcial + digito1);
        const novoCpf = cpfParcial + digito1 + digito2;

        return novoCpf === this.cpfEnviado;
    }

    criaDigito(cpfParcial) {
        const arrayCpf = Array.from(cpfParcial);
        let regressivo = arrayCpf.length + 2;
        const total = arrayCpf.reduce((ac, val) => {
            regressivo--;
            return ac += (val * regressivo);
        }, 0);
        const digito = 11 - (total % 11)
        return digito > 9 ? 0 : digito;
    }

    isSequence() {
        const sequencia = this.cpfEnviado[0].repeat(this.cpfEnviado.length);
        return sequencia === this.cpfEnviado
    }
}

const cpf = new ValidaCpf('070.987.720-03'); // teste
console.log(cpf.valido())
// cpf válido = 705.484.450-52 
// cpf válido = 070.987.720-03