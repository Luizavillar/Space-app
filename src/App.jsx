import { styled } from "styled-components"
import EstilosGlobais from "./componentes/EstilosGlobais"
import Cabecalho from "./componentes/Cabecalho"
import BarraLateral from "./componentes/BarraLateral"
import Banner from "./componentes/Banner"
import bannerBackground from "./assets/banner.png"
import Galeria from "./componentes/Galeria"
import fotos from "./fotos.json"
import { useEffect, useState } from "react"
import ModalZoom from "./componentes/ModalZoom"
import Rodape from "./componentes/Rodape"

const FundoGradiente = styled.div`
  background: linear-gradient(174.61deg, #041833 4.16%, #04244F 48%, #154580 96.76%);
  width: 100%;
  min-height: 100vh;
`

const AppContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  max-width: 100%;
`

const MainConatiner = styled.main`
  display: flex;
  gap: 24px;
`

const ConteudoGaleria = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const App = () => {
  const [fotosDaGaleria, setFotosDaGaleria] = useState(fotos)
  const [filtro, setFiltro] = useState('')
  const [tag, setTag] = useState(0)
  const [fotoSelecionada, setFotoSelecionada] = useState(null)

  useEffect(() => {
    const fotosFiltradas = fotos.filter(foto => {
      const filtroPorTag = !tag || foto.tagId === tag;
      const filtroPorTitulo = !filtro || foto.titulo.toLowerCase().includes(filtro.toLowerCase())
      return filtroPorTag && filtroPorTitulo
    })
    setFotosDaGaleria(fotosFiltradas)
  }, [filtro, tag])

  const aoAlternarFavorito = (foto) => {
    setFotosDaGaleria(fotosDaGaleria.map(fotoDaGaleria => {
      if (fotoDaGaleria.id === foto.id) {
        return { ...fotoDaGaleria, favorita: !fotoDaGaleria.favorita }
      }
      return fotoDaGaleria
    }))
    if (fotoSelecionada && foto.id === fotoSelecionada.id) {
      setFotoSelecionada({
        ...fotoSelecionada,
        favorita: !fotoSelecionada.favorita
      })
    }
  }

  return (
    <FundoGradiente>
      <EstilosGlobais />
      <AppContainer>
        <Cabecalho
          filtro={filtro}
          setFiltro={setFiltro}
        />
        <MainConatiner>
          <BarraLateral />
          <ConteudoGaleria>
            <Banner
              texto="A galeria mais completa de fotos do espaço!"
              backgroundImage={bannerBackground}
            />
            <Galeria
              aoFotoSelecionada={foto => setFotoSelecionada(foto)}
              aoAlternarFavorito={aoAlternarFavorito}
              fotos={fotosDaGaleria}
              setTag={setTag}
            />
          </ConteudoGaleria>
        </MainConatiner>
      </AppContainer>
      <ModalZoom
        foto={fotoSelecionada}
        aoFechar={() => setFotoSelecionada(null)}
        aoAlternarFavorito={aoAlternarFavorito}
      />
      <Rodape />
    </FundoGradiente>
  )
}

export default App
