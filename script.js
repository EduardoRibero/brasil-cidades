const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            entry.target.classList.add('hidden')
        }
    })
})
const elements = document.querySelectorAll('.hidden')

elements.forEach((element) => {
    myObserver.observe(element)
})


function loadData() {
    fetch('https://script.google.com/macros/s/AKfycbzxhPpN-eOOykPxGtqSCfv9bgJ186QL6or1Qox7Yv47HaSlQFhS5MXiV4ekQ9fTkAy3/exec')
        .then(response => response.json())
        .then(data => {
            var ufSelect = document.getElementById('uf');
            var cidadeSelect = document.getElementById('cidade');

            var ufs = [...new Set(data.saida.map(row => row[0]))];
            ufs.forEach(function (uf) {
                var option = document.createElement('option');
                option.value = uf;
                option.text = uf;
                ufSelect.appendChild(option);
            });

            ufSelect.onchange = function () {
                var selectedUF = ufSelect.value;
                cidadeSelect.innerHTML = '<option value="">Select Cidade</option>';
                var cidades = data.saida.filter(row => row[0] === selectedUF).map(row => row[1]);
                cidades.forEach(function (cidade) {
                    var option = document.createElement('option');
                    option.value = cidade;
                    option.text = cidade;
                    cidadeSelect.appendChild(option);
                });
            };

            cidadeSelect.onchange = function () {
                var selectedCidade = cidadeSelect.value;
                var selectedRow = data.saida.find(row => row[1] === selectedCidade);
                var linkAgenda = selectedRow[2];
                var linkCcadastro = selectedRow[3];
                var LinkVoltar = "https://maiscoracao.com.br/"

                // Certifique-se de que o link é absoluto
                if (!/^https?:\/\//i.test(linkAgenda)) {
                    linkAgenda = 'http://' + linkAgenda; // Adiciona "http://" se estiver faltando
                }

                document.getElementById('linkButton').onclick = function () {
                    window.open(linkAgenda, '_blank');
                };

                if (!/^https?:\/\//i.test(linkCcadastro)) {
                    linkCcadastro = 'http://' + linkCcadastro; 
                }

                document.getElementById('linkButtonCadastro').onclick = function () {
                    window.open(linkCcadastro, '_blank');
                };
                document.getElementById('linkButton').style.display = 'block';
                document.getElementById('linkButtonCadastro').style.display = 'block';
            };

        })
        .catch(error => console.error('Erro ao carregar dados:', error));
}

window.onload = loadData;