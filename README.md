# Validação de CPF

## Descrição:

Método de validação de CPF desenvolvido em JavaScript com paradigma de programação orientada a objetos.

---

## Algoritmo utilizado para validação:

1. Validação do primeiro dígito

Primeiramente multiplica-se os 9 primeiros dígitos pela sequência decrescente de números de 10 à 2 e soma os resultados.
> Usando o CPF fictício como exemplo "705.484.450-52".


> 7 *10 + 0 *9 + 5 *8 + 4 *7 + 8 *6 + 4 *5 + 4 *4 + 5 *3 + 0 *2 =

Agora basta realizar o calculo de RESTO da divisão por 11 e subtrair por 11.

> 11 - (resultado % 11)

Assim iremos obter o __primeiro dígito verificador__ (primeiro dígito depois do '-'), se o dígito for igual ao enviado a primeira parte da validação está correta.

__OBS: Se o número dígito for maior que 9, consideramos 0.__

2. Validação do segundo dígito

A validação do segundo dígito é semelhante à primeira, porém vamos considerar os 9 primeiros dígitos, mais o primeiro dígito verificador, e vamos multiplicar esses 10 números pela sequência decrescente de 11 a 2.

> 7 *11 + 0 *10 + 5 *9 + 4 *8 + 8 *7 + 4 *6 + 4 *5 + 5 *4 + 0 *3 + 5 *2 =

Agora basta realizar o calculo de RESTO da divisão novamente.

> 11 - (resultado % 11)

Com essa verificação, constatamos que o CPF é válido comparando o CPF recebido com os dígitos finais gerados pelos calculos.

__Existe alguns casos de CPFs que passam nessa validação que expliquei, mas que ainda são inválidos. É os caso dos CPFs com dígitos repetidos (111.111.111-11, 222.222.222-22, ...). Esses CPF atendem à validação, mas ainda são considerados inválidos.__


---
# code preview:

```javascript
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
const cpf = new ValidaCpf('070.987.720-03'); 
console.log(cpf.valido()) // teste
```

By Riatla Dias ✌ [Visit my Linkedin](https://www.linkedin.com/in/riatladias/)