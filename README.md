# Galeria com Localização

Aplicativo mobile desenvolvido em React Native com Expo para cadastrar fotos tiradas pela câmera do celular, associando cada imagem à localização geográfica atual e salvando os dados localmente com SQLite.

## Funcionalidades

- Tirar foto usando a câmera do celular
- Solicitar permissão de câmera e localização
- Capturar latitude e longitude no momento do cadastro
- Salvar título, imagem, data, latitude e longitude no SQLite
- Listar fotos cadastradas em uma galeria
- Exibir fotos no mapa com marcadores
- Mostrar título e miniatura ao tocar no marcador
- Excluir fotos cadastradas
- Manter os dados salvos mesmo após fechar o aplicativo

## Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- expo-sqlite
- expo-image-picker
- expo-location
- react-native-maps

## Banco de dados

Tabela utilizada: `photos`

Campos:

- `id`
- `title`
- `image_uri`
- `latitude`
- `longitude`
- `created_at`

## Como executar o projeto

Instale as dependências:

No terminal, dentro da pasta do projeto, execute:

```bash
npm install
```

### 2. Instalar as bibliotecas utilizadas

```bash
npx expo install expo-sqlite expo-image-picker expo-location react-native-maps
```

### 3. Iniciar o projeto

```bash
npx expo start
```

ou

```bash
npx expo start -c
```

O parâmetro `-c` limpa o cache do Expo.

### 4. Executar no celular

1. Instale o aplicativo **Expo Go** no celular
2. Abra o Expo Go
3. Escaneie o QR Code exibido no terminal ou navegador

### 5. Utilização

* Digite um título
* Clique em **“Tirar foto”**
* Permita acesso à câmera e localização
* Capture a imagem
* A foto será salva localmente e exibida na galeria e no mapa
