# PG-2023-01
Membros do grupo: Nicholas Pandelis Papadopoulos Ferreira - RA 800917 e Gabriel Evangelista Gonçalves da Silva - RA 802791

Os Anjos Lamentadores, da série de ficção científica Doctor Who, são seres que se alimentam do tempo de vida futuro de suas presas. Elas se assemelham a estátuas de pedra e, ao serem observadas, ficam imóveis. O perigo está em não manter contato visual com a criatura: elas se movem em sua direção e te atacam quando menos esperar! Nesse contexto, o trabalho “Não pisque” visa reproduzir o ataque de um Anjo Lamentador com conceitos estudados durante a segunda parte do semestre de Processamento Gráfico com a ferramenta ThreeJS.

No projeto, foram escolhidos 2 objetos, um para cada membro do grupo, sendo um deles a Tardis (uma cabine telefônica) e o Anjo Lamentador. Ambos foram redimensionados e posicionados de forma julgada adequada pelo grupo. A animação e o RawShaderMaterial foram definidos para o Anjo. 

A aplicação do RawShaderMaterial, requerida na especificação, se deu por uma função simples que mapeia cores ao FragmentShader, resultando em uma mistura de cores no modelo.

O movimento simples foi desenvolvido em cima do modelo do anjo. Seu movimento é interativo e simula o comportamento da série: estar na guia significa estar olhando para o Anjo, que não se move; ao trocar de guias e voltar para essa, pode perceber a locomoção do predador. Toda essa interação é projetada para o plano de projeção da câmera 1. Ao se aproximar muito, o Anjo te pega e ocorre uma mudança abrupta para a câmera 2. 

SETUP: Para iniciar a aplicação, é necessário ter instalado as ferramentas Node.js, ThreeJS e Vite. Ao baixar o projeto, basta executar o seguinte comando com o terminal (dentro do diretório do projeto): npm dev run. 

AVISO: Ao iniciar a aplicação, é possível que o Anjo não seja carregado. Assim, recomenda-se alterar qualquer caractere do código, desfazer a alteração (sem o uso de ctrl-z, e sim inserindo manualmente o carácter apagado) e salvá-lo para recarregar a página web. Caso não seja suficiente, reinicie o servidor digitando ‘q’ no terminal que está rodando ele e execute npm dev run novamente. 
