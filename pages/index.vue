<script setup lang="ts">
enum DeterminatProperties {
  LineOrColumnNull = "Uma linha ou coluna da matriz é composta apenas de zeros",
  LinesOrColumnsEquals = "Duas linhas ou colunas são iguais",
  TriangularMatrix = "O produto dos elementos da diagonal principal é igual ao determinante da matriz",
  // LinesOrColumsProportional = "Duas linhas ou colunas proporcionais",
}

const { $pwa } = useNuxtApp();

const order: Ref<number | null> = ref(null);
const totalFields: Ref<number> = ref(0);
const matrix: Ref<Array<Array<number>>> = ref([]);
const result: Ref<number> = ref(0);
const showResult: Ref<boolean> = ref(false);
const properties: Ref<Array<string>> = ref([]);
const liimitOrder: any = [
  (v: number) => v <= 60 || "Digite um número menor",
  (v: number) =>
    v && v !== null && v !== undefined && v <= 0
      ? "Digite um número maior que zero"
      : true,
];

const generateMatrixFields = () => {
  if (order) {
    showResult.value = false;
    totalFields.value = Math.pow(Number(order.value), 2);
    matrix.value = [];
    let line = [];
    for (let i = 0; i <= totalFields.value; i++) {
      if (order.value && i % order.value === 0 && i !== 0) {
        matrix.value.push(line);
        line = [];
      }
      line.push(0);
    }
  }
};

const generateRamdomValues = () => {
  for (const i of matrix.value) {
    for (let j of i) {
      matrix.value[matrix.value.indexOf(i)][i.indexOf(j)] = Math.round(
        Math.random() * 10
      );
    }
  }
};

const checkMatrixProperties = () => {
  properties.value = [];
  if (haveLineOrColumnOnlyZero()) {
    properties.value.push(DeterminatProperties.LineOrColumnNull);
  }
  if (twoLinerOrColumnsAreEquals()) {
    properties.value.push(DeterminatProperties.LinesOrColumnsEquals);
  }
  if (isAnTriangularMatrix()) {
    properties.value.push(DeterminatProperties.TriangularMatrix);
  }
};

const haveLineOrColumnOnlyZero = () => {
  for (const i of matrix.value) {
    return i.every((x: number) => x == 0);
  }
};

const isAnTriangularMatrix = () => {
  const bottomTriangular = [];
  const upperTriangular = [];
  for (let i = 0; i < matrix.value.length; i++) {
    const line = matrix.value[i];
    bottomTriangular.push(...line.slice(0, i));
    upperTriangular.push(...line.slice(i + 1));
  }
  return (
    bottomTriangular.every((i: number) => i == 0) ||
    upperTriangular.every((i: number) => i == 0)
  );
};

const twoLinerOrColumnsAreEquals = () => {
  const columns = [];
  for (const i of matrix.value) {
    const column = [];
    const idx = matrix.value.indexOf(i);
    for (let j = 0; j < i.length; j++) {
      column.push(matrix.value[j][idx]);
    }
    columns.push(column);
  }
  return compareLinesOfMatrix(columns) || compareLinesOfMatrix(matrix.value);
};

const compare = (array: Array<number>, anotherArray: Array<number>) => {
  return (
    array.length === anotherArray.length &&
    array.every((i: number, idx: number) => i === anotherArray[idx])
  );
};

const compareLinesOfMatrix = (array: Array<Array<number>>) => {
  for (let i = 0; i < array.length; i++) {
    const item: Array<number> = array[i];
    return array.some((j: Array<number>, idx: number) =>
      idx !== i ? compare(item, j) : false
    );
  }
};

const calculateLaPlace = () => {
  checkMatrixProperties();
  if (order.value && order.value > 3) {
    // TODO Buscar melhor linha e coluna (!)
    const sumOfLinesElements = [];
    for (const i of matrix.value) {
      sumOfLinesElements.push(i.reduce((a: any, c: any) => a + c));
    }
    const best = sumOfLinesElements.indexOf(Math.min(...sumOfLinesElements));

    let matrixCopy: Array<Array<number>> = JSON.parse(
      JSON.stringify(matrix.value)
    );

    matrixCopy = matrixCopy.filter(
      (i: Array<number>, idx: number) => idx !== best
    );

    const selectedLine = matrix.value[best];

    // console.log(best);
    // console.log(matrix.value);
    // console.log(matrixCopy);
    for (let i = 0; i < selectedLine.length - 1; i++) {
      console.log(i);
      matrixCopy[i];
      // for(const j of matrixCopy){
      // matrixCopy[i] = matrixCopy[i].filter((i,idx) => idx)
      // }
    }
  } else if (order.value) {
    if (order.value == 2) {
      result.value =
        matrix.value[0][0] * matrix.value[1][1] -
        matrix.value[0][1] * matrix.value[1][0];
      showResult.value = true;
      return;
    }
    if (order.value == 1) {
      result.value = matrix.value[0][0];
      showResult.value = true;
      return;
    }
    // Calcular sarrus
    result.value = threeOrderDeterminant(matrix.value);
    showResult.value = true;
  }
};
</script>

<template>
  <v-container class="d-flex justify-center">
    <v-card style="width: 80vw">
      <v-card-title class="d-flex justify-center">Matriz</v-card-title>
      <v-card-text>
        <v-row>
          <v-col lg="4">
            <v-text-field
              v-model="order"
              label="Ordem da matriz"
              placeholder="Digite aqui a ordem da matriz"
              type="number"
              variant="outlined"
              color="primary"
              :rules="liimitOrder"
              min="1"
              max="999"
            />
          </v-col>
          <v-col>
            <v-btn
              :disabled="Math.sqrt(totalFields) == order"
              size="x-large"
              color="primary"
              @click="generateMatrixFields"
              >OK</v-btn
            >
          </v-col>
          <v-col>
            <v-btn @click="$pwa.install()">Install PWA</v-btn>
          </v-col>
        </v-row>
        <v-card-text class="px-3 pt-0 mb-5">
          <v-row>
            <v-btn
              v-if="totalFields"
              size="small"
              color="blue darken-1"
              @click="generateRamdomValues"
              >Gerar valores aleatórios</v-btn
            >
          </v-row>
          <v-row class="mt-4">
            <v-btn
              :disabled="!totalFields"
              size="small"
              color="primary"
              @click="calculateLaPlace"
              >Calcular laPlace</v-btn
            >
          </v-row>
        </v-card-text>

        <v-row v-for="(i, idx) of matrix">
          <v-col cols="3" sm="3" md="3" lg="2" xl="3" v-for="(j, indx) of i">
            <v-text-field
              :id="'input-test-' + (indx + idx - 1)"
              v-model.number="matrix[idx][indx]"
              :label="`Posição  ${idx + 1} ${indx + 1}`"
              type="number"
              variant="outlined"
              density="compact"
              color="primary"
              min="1"
              max="999"
            />
          </v-col>
        </v-row>
        <span v-if="order">
          {{ order + "x" + order }}
        </span>
        <v-card-title v-if="showResult">
          Determinante:
          <div id="resultLabel">{{ result }}</div>
        </v-card-title>
        <v-card-subtitle v-for="propertie in properties">{{
          propertie
        }}</v-card-subtitle>
      </v-card-text>
    </v-card>
  </v-container>
</template>
