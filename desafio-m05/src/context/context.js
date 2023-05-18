import { useContext, useState } from "react";

import { createContext } from "react";

import { useLocalStorageBoolean } from "react-use-window-localstorage";

const ContextGlobal = createContext({});

export function ContextProvider({ children }) {
  const defaultValue = true;
  const [value, setValue] = useLocalStorageBoolean("verdadeiro", defaultValue);

  const [showModal, setShowModal] = useState(false)
  const [showModalEditeCliente, setShowModalEditeCliente] = useState(false)
  const [showModalEdite, setShowModalEdite] = useState(false)
  const [showModalCobranca, setShowModalCobranca] = useState(false)
  const [containerHero, setContainerHero] = useState(value)
  const [containerCliente, setContainerCliente] = useState(!value)
  const [containerDetalhe, setContainerDetalhe] = useState(!value)
  const [containerCobranca, setContainerCobranca] = useState(!value)
  const [control, setControl] = useState(!value)
  const [showModalEditarCobranca, setShowModalEditarCobranca] = useState(!value)
  const [showModalDelite, setShowModalDelite] = useState(!value)
  const [showModalDetalheCobranca, setShowModalDetalheCobranca] = useState(value)
  const [titleHeader, setTitleHeader] = useState('1');
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [alerta, setAlerta] = useState(false)
  const [alertaError, setAlertaError] = useState(false)
  const [alertaCliente, setAlertaCliente] = useState(!value)
  const [alertaCobranca, setAlertaCobranca] = useState(!value)
  const [alertaEditar, setAlertaEditar] = useState(!value)
  const [alertaEditarCliente, setAlertaEditarCliente] = useState(!value)
  const [alertaDeletar, setAlertaDeletar] = useState(!value)
  const [conteinerModal, setContainerModal] = useState(value)
  const [conteinerModalCliente, setContainerModalCliente] = useState(value)
  const [showModalHeader, setShowModalHeader] = useState(!value)
  const [idCliente, setIdCliente] = useState()
  const [idCobranca, setIdCobranca] = useState()
  const [risco, setRisco] = useState('selectHome');
  const [statusCobranca, setStatusCobranca] = useState('');
  const [tablePaga, setTablePaga] = useState(!value)
  const [tablePendente, setTablePendete] = useState(!value)
  const [tableVencido, setTableVencido] = useState(!value)
  const [tableClienteEmDia, setTableClienteEmDia] = useState(!value)
  const [tableCliente, setTableCliente] = useState(!value)
  const [arrayBusca, setArrayBusca] = useState([])
  const [arrayBuscaCobranca, setArrayBuscaCobranca] = useState([])
  const [resultadoBusca, setResultadoBusca] = useState('')
  const [resultadoBuscaCobranca, setResultadoBuscaCobranca] = useState('')
  const [listaResultadoDaBusca, setListaResultadoBusca] = useState(!value)
  const [buscaNaoEncontrada, setBuscaNaoEncontrada] = useState(!value)
  const [buscaNaoEncontradaCobranca, setBuscaNaoEncontradaCobranca] = useState(!value)
  const [tabelaCompleta, setTabelaCompleta] = useState(value)
  const [tabelaCompletaCobranca, setTabelaCompletaCobranca] = useState(value)


  const steps = [
    "Cadastre-se",
    "Escolha uma senha",
    "Cadastro realizado com sucesso"
  ];

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep(activeStep + 1);
    setSkipped(newSkipped);
  };


  function abrirModal() {
    setShowModal(!showModal)
  }
  function abrirModalEdite() {
    setShowModalEdite(true)
  }

  return (
    <ContextGlobal.Provider value={{
      activeStep,
      setActiveStep,
      skipped,
      setSkipped,
      handleNext,
      isStepSkipped,
      steps,
      titleHeader,
      setTitleHeader,
      containerCliente,
      setContainerCliente,
      containerCobranca,
      setContainerCobranca,
      containerHero,
      setContainerHero,
      showModal,
      setShowModal,
      abrirModal,
      abrirModalEdite,
      showModalEdite,
      setShowModalEdite,
      alerta,
      setAlerta,
      alertaCliente,
      setAlertaCliente,
      conteinerModal,
      setContainerModal,
      conteinerModalCliente,
      setContainerModalCliente,
      showModalHeader,
      setShowModalHeader,
      containerDetalhe,
      setContainerDetalhe,
      showModalEditeCliente,
      setShowModalEditeCliente,
      showModalCobranca,
      setShowModalCobranca,
      idCliente,
      setIdCliente,
      value,
      setValue,
      showModalDelite,
      setShowModalDelite,
      showModalDetalheCobranca,
      setShowModalDetalheCobranca,
      risco,
      setRisco,
      showModalEditarCobranca,
      setShowModalEditarCobranca,
      idCobranca,
      setIdCobranca,
      control,
      setControl,
      alertaError,
      setAlertaError,
      alertaDeletar,
      setAlertaDeletar,
      alertaEditar,
      setAlertaEditar,
      alertaCobranca,
      setAlertaCobranca,
      alertaEditarCliente,
      setAlertaEditarCliente,
      statusCobranca,
      setStatusCobranca,
      tableCliente,
      setTableCliente,
      tableClienteEmDia,
      setTableClienteEmDia,
      tableVencido,
      setTableVencido,
      tablePendente,
      setTablePendete,
      tablePaga,
      setTablePaga,
      arrayBusca,
      setArrayBusca,
      resultadoBusca,
      setResultadoBusca,
      listaResultadoDaBusca,
      setListaResultadoBusca,
      buscaNaoEncontrada,
      setBuscaNaoEncontrada,
      tabelaCompleta,
      setTabelaCompleta,
      resultadoBuscaCobranca,
      setResultadoBuscaCobranca,
      arrayBuscaCobranca,
      setArrayBuscaCobranca,
      tabelaCompletaCobranca,
      setTabelaCompletaCobranca,
      buscaNaoEncontradaCobranca,
      setBuscaNaoEncontradaCobranca

    }}>
      {children}
    </ContextGlobal.Provider>
  )
}

export function useHooke() {
  return useContext(ContextGlobal);
}
