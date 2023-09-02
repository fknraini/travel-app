import React, { useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import AppComponent from "./routes/app";

let persistor = persistStore(store);

const App: React.FC = () => {
  const queryClient = useRef(new QueryClient());

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient.current}>
          <Router>
            <AppComponent restricted={false} path={""} />
          </Router>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;


// import React, { useRef } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";
// import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
// import { QueryClient, QueryClientProvider } from "react-query";

// import AppComponent from "./routes/app";

// let persistor = persistStore(store);

// // function App() {
//   const App: React.FC =() => {
  
//   const queryClient = useRef(new QueryClient());

//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <QueryClientProvider client={queryClient.current}>
//           <Router>
//             <AppComponent restricted={false} path={""} />
//           </Router>
//         </QueryClientProvider>
//       </PersistGate>
//     </Provider>
//   );
// }

// export default App;
