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

```bash
npm install    