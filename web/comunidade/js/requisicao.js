async function classifyText(sequence, candidateLabels) {
    try {
        // Envia os dados para o servidor Flask
        const response = await fetch("https://23a6-2804-14c-6573-400b-6c8a-79eb-8ca-91ec.ngrok-free.app/classify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sequence: sequence, // Texto a ser classificado
                candidate_labels: candidateLabels // Labels para classificação
            })
        });

        if (!response.ok) {
            throw new Error(`Erro na resposta do servidor: ${response.status}`);
        }

        // Processa a resposta JSON
        const result = await response.json();
        console.log("Resultado da Classificação:", result);

        return result; // Retorna o resultado (opcional)
    } catch (error) {
        console.error("Erro:", error);
    }
}

// Teste a função
document.getElementById("enviar").addEventListener("click", async () => {
    const sequence = document.getElementById("comentario").value; // Obtém o texto do input
    const candidateLabels = ["positivo", "ofensivo"]; // Labels de exemplo

    if (!sequence) {
        console.error("Erro: O campo de texto está vazio.");
        return;
    }

    const result = await classifyText(sequence, candidateLabels);
    if (result) {
        // Exemplo de como acessar o resultado no retorno
        console.log("Labels:", result.labels);
        console.log("Scores:", result.scores);
    }
});