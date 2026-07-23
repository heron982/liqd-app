# Liqd App

Stack principal: **Expo · React Native · Expo Router · TypeScript · Zustand · TanStack Query · expo-secure-store**.

---

## Arquitetura

O frontend combina:

- **Estrutura modular** em `src/modules/[modulo]`
- **MVVM-like** na apresentação (`views/` + hooks de viewmodel)
- **Clean Architecture** nas camadas de aplicação e infraestrutura (use cases, repositories, api client)

### Fluxo obrigatório

```text
view → viewmodel → use-case → repository → api client
```

Regras:

- UI não chama API diretamente
- View não chama repository nem instancia cliente HTTP
- Viewmodel orquestra estado/eventos e aciona **use cases** (não repository/api client)
- Use case contém fluxo de aplicação / regra de negócio
- Repository é o gateway HTTP (via `ApiClientAdapter`)
- Store (Zustand) guarda sessão/estado de cliente; **TanStack Query** guarda server-state (cache, loading, refetch)

Complementos comuns: `viewmodel → useQuery/useMutation → use-case`; `viewmodel → store`; `routes → middlewares → views`.

---

## Estrutura do repositório

```text
app/                          # Expo Router (rotas finas)
├── _layout.tsx               # bootstrap de sessão + stack raiz
├── index.tsx                 # redirect inicial
├── (auth)/                   # grupo público (login/register)
└── (app)/                    # grupo autenticado (tabs)

src/modules/
├── auth/                     # sessão, login, registro, middlewares
├── dashboard/                # home (saldo + preço)
├── trade/                    # compra/venda
├── transaction/              # histórico
└── shared/                   # infra e UI transversais
    ├── components/           # button, card, screen, text-field
    ├── config/               # env
    ├── library/
    │   ├── api-client/       # HTTP + erros
    │   ├── composition.ts    # instanciação de repositories/use cases
    │   ├── query/            # TanStack Query (client, keys, focus)
    │   └── secure-storage.ts # expo-secure-store
    └── theme/                # tokens de cor/espaçamento
```

`app/` só declara rotas e delega para páginas em `src/modules/*/views/`. A lógica fica nos módulos.

---

## Convenção por módulo

```text
src/modules/[modulo]/
├── hooks/            # hooks reutilizáveis do módulo (quando houver)
├── interfaces/       # contratos e tipos de domínio
├── middlewares/      # proteção de rota (ex.: auth)
├── repositories/     # acesso HTTP
├── stores/           # estado compartilhado (Zustand)
├── use-cases/
│   └── __tests__/    # testes de caso de uso (*.spec.ts)
└── views/            # telas e componentes da UI
```

Nem todo módulo tem todas as pastas — só o que a responsabilidade exigir.

### Views (páginas)

Telas de rota usam sufixo `page` / `Page`:

```text
views/
└── history-page/
    ├── history-page.tsx              → export function HistoryPage()
    ├── history-page-viewmodel.ts     → useHistoryPageViewModel()
    └── components/
        └── transaction-row.tsx
```

- Diretório, arquivo e componente exportado usam o sufixo
- Viewmodel da página: `useXxxPageViewModel`
- Subcomponentes **não** usam sufixo `Page`
- A view é fina: composição visual e binding com o viewmodel
- Subcomponentes podem importar o viewmodel diretamente (evitar props gigantes)

### Responsabilidades por camada

| Camada | Responsabilidade |
|--------|------------------|
| **Page / view** | Layout, inputs, lista, feedback visual |
| **ViewModel** | Estado local da tela, handlers, loading/error, chama use cases |
| **Use case** | Fluxo de aplicação e regra de negócio (sem React) |
| **Repository** | Endpoints e mapeamento HTTP |
| **Api client** | `fetch`, headers, token, erros |
| **Store** | Sessão e estado compartilhado entre telas |
| **Middleware** | Guardas de navegação (`RequireAuth`, `GuestOnly`) |

---

## Módulos

| Módulo | Função |
|--------|--------|
| `auth` | Login, registro, bootstrap/logout de sessão, store com token em SecureStore, middlewares |
| `dashboard` | Home com saldo e preço de mercado |
| `trade` | Compra e venda de BTC |
| `transaction` | Histórico de operações |
| `shared` | Componentes, tema, env, api-client, composition, query, storage seguro |

---

## Composição de dependências

Repositories e use cases são instanciados em `src/modules/shared/library/composition.ts` e importados pelos viewmodels:

```ts
import { loginUseCase } from '@/modules/shared/library/composition';

await loginUseCase.execute({ email, password });
```

Não instanciar repository/api client na UI.

---

## TanStack Query

Server-state (dashboard, histórico) usa `@tanstack/react-query` nos viewmodels, sempre via use cases:

```ts
useQuery({
  queryKey: queryKeys.dashboard,
  queryFn: () => loadDashboardUseCase.execute(),
});
```

- Provider em `app/_layout.tsx`
- Keys em `shared/library/query/query-keys.ts`
- Refetch ao focar aba: `useRefreshOnFocus`
- Após compra/venda: `invalidateQueries` de `dashboard` e `transactions`
- Logout limpa o cache (`queryClient.clear()`)

---

## Rotas (Expo Router)

| Rota | Página |
|------|--------|
| `/(auth)/login` | `LoginPage` |
| `/(auth)/register` | `RegisterPage` |
| `/(app)/` | `HomePage` |
| `/(app)/trade` | `TradePage` |
| `/(app)/transactions` | `HistoryPage` |

Grupos:

- `(auth)` — `GuestOnly` (redireciona se já autenticado)
- `(app)` — `RequireAuth` + tabs (Home / Trade / Histórico)

O root layout executa `BootstrapSessionUseCase` antes de liberar a navegação.

---

## UI e imports

- Estilos com `StyleSheet` do React Native e tokens em `shared/theme/tokens`
- Componentes reutilizáveis em `shared/components/` (sem pasta `ui/`)
- Componentes de uma tela em `views/[name]-page/components/`
- Alias `@/` aponta para `src/`

---

## Setup

```bash
npm install
cp .env.example .env
npm start
```

Scripts: `npm run android` · `npm run ios`

### API (`EXPO_PUBLIC_API_URL`)

No `.env`, use o IP LAN do PC (não `localhost` no celular):

```env
EXPO_PUBLIC_API_URL=http://192.168.1.2:8000/api
```

Se a variável não estiver definida, o app tenta o mesmo host do Metro (Expo Go) + porta `8000`.

Fallbacks:

- **Android Emulator** → `http://10.0.2.2:8000/api`
- **iOS Simulator / web local** → `http://localhost:8000/api`

A API Laravel precisa estar no ar (ex.: `docker compose up` no backend) e acessível na rede:

1. No celular, abra `http://SEU_IP:8000/api` no navegador — se não abrir, o app também falha.
2. Mesma Wi‑Fi do PC (sem rede de convidado / isolamento de cliente).
3. Firewall do Windows liberando a porta `8000` (inbound TCP).
4. No iOS: Ajustes → Expo Go → Rede Local → **ligado**.

---

## Como adicionar uma feature

1. Escolher (ou criar) o módulo em `src/modules/[modulo]`
2. Criar a página em `views/[nome]-page/`
3. Estado e handlers no `*-page-viewmodel.ts`
4. Regra/fluxo em `use-cases/`
5. HTTP em `repositories/`
6. Exportar o use case em `shared/library/composition.ts`
7. Expor a rota em `app/` apontando para a `XxxPage`
8. Store só se o estado for compartilhado ou persistido

---

## Sinais de violação

- View/componente chamando repository ou HTTP direto
- Viewmodel pulando use case para repository
- Regra de negócio pesada no viewmodel em vez do use case
- Use case dependente de componente React
- Repository com toast/estado visual
- Código de um módulo em `shared/` sem necessidade real
- Página sem sufixo `Page` / pasta `-page`


## Erro "Network request failed"

No celular físico, `localhost` não funciona. Use o IP da sua máquina na mesma Wi‑Fi:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.2:8000/api
```

Depois reinicie com `npx expo start -c`.
Celular e PC precisam estar na mesma rede, e a API no ar (`docker compose up`).
