# Central de Monitoramento de Missão Espacial

Um aplicativo cross-platform desenvolvido com **React Native, Expo e TypeScript** que simula uma dashboard de controle de missão.

## Descrição

O aplicativo oferece uma interface de controle de missão simulando dados reais de sensores, disparo automático de alertas críticos, formulário com a configuração da missão e persistência local com AsyncStorage and gerenciamento de estado global via Context API.

---

## Integrantes do grupo

| Nome                 | RM       |
|----------------------|----------|
| Hector van Tol Taver | RM562881 |
| Juan Gigliotti Cunha | RM563253 |
| Raissa Fabrício Lima | RM563772 |

---

## Features

- **Dashboard em tempo real** — Simulação de um dados de sensores, sistema de energia, comunicação e estabilidade orbital em tempo real, com valores que atualizam a cada 5 segundos para simular mudanças em tempo real.
- **Alertas automáticos** — Aleras críticos e avisos disparados automaticamente dependêndo dos valores medidos na dashboard.
- **Formulário para configuração da missão** — Forms com validação para configuração da missão.
- **Persistent Storage** — Estado da missão e configurações são salvas via AsyncStorage.

---

## Requisitos e instalação

### Pré-requisitos
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your device (or an emulator)

### Instalação das dependências
```bash
npm install
npm install @react-native-async-storage/async-storage
npm install expo-router
```

### Executando a aplicação
```bash
npx expo start
```

---

## Thresholds para os alertas

| Parâmetro   | Aviso       | Crítico           |
|-------------|-------------|-------------------|
| Temperatura | > 28°C      | > 35°C or < -10°C |
| Oxigênio    | < 19.5%     | < 18%             |
| Radiação    | > 1.5 mSv/h | > 2 mSv/h         |
| Bateria     | < 40%       | < 20%             |
| Sinal       | < -90 dBm   | Disconnected      |
| Altitude    | —           | < 200 km          |
