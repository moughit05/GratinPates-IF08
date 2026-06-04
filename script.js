const plist = document.getElementById("productList");
const averageContainer = document.getElementById("averageNutriScore");

let totalScore = 0;
let validCount = 0;

// Fonction pour créer la carte HTML
function addIngredient(texte_recette, product = null) {
    const content = document.createElement("div");
    content.className = "col-12 col-sm-6 col-md-4 col-lg-3 card text-center p-3 mb-3 mx-2";

    if (product) {
        const nutriScore = product.nutriscore_grade || "unknown";
        const imageUrl =
            product.image_front_small_url ||
            "https://placehold.co/150x150?text=Pas+d'image";
        const productName = product.product_name || "Produit inconnu";

        content.innerHTML = `
            <img src="${imageUrl}" alt="${productName}" class="rounded-circle mx-auto mb-2"
                 style="width: 100px; height: 100px; object-fit: cover;" />
            <p class="fw-bold mb-1">${productName}</p>
            <p class="small text-muted">${texte_recette}</p>
            <img src="https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${nutriScore}.svg"
                 alt="Nutri-Score ${nutriScore}" style="height: 40px; margin: 0 auto;">
        `;
    } else {
        content.innerHTML = `
            <img src="https://placehold.co/150x150/eeeeee/999999?text=Introuvable"
                 alt="Introuvable"
                 class="rounded-circle mx-auto mb-2"
                 style="width: 100px; height: 100px; object-fit: cover;" />
            <p class="fw-bold mb-1 text-danger">Données indisponibles</p>
            <p class="small text-muted">${texte_recette}</p>
        `;
    }

    plist.appendChild(content);
}

// Fonction pour convertir un score numérique en lettre Nutri-Score
function getAverageGrade(score) {
    if (score <= -1) return "A";
    if (score <= 2) return "B";
    if (score <= 10) return "C";
    if (score <= 18) return "D";
    return "E";
}

// Fonction pour choisir la couleur Bootstrap
function getAlertClass(grade) {
    if (grade === "A" || grade === "B") return "alert-success";
    if (grade === "C") return "alert-warning";
    return "alert-danger";
}

// Fonction d'affichage du résultat
function updateAverageNutriScore() {
    if (validCount > 0) {
        const averageScore = totalScore / validCount;
        const averageGrade = getAverageGrade(averageScore);

        const alertClass = getAlertClass(averageGrade);
        const badgeUrl = `https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${averageGrade.toLowerCase()}.svg`;

        averageContainer.className =
            `alert ${alertClass} text-center fs-5 shadow-sm d-flex justify-content-center align-items-center gap-3`;

        averageContainer.innerHTML = `
            <span>
                Nutri-Score moyen de la recette : <strong>${averageGrade}</strong>
            </span>
            <img src="${badgeUrl}"
                 alt="Nutri-Score ${averageGrade}"
                 style="height: 45px;">
        `;
    } else {
        averageContainer.className =
            "alert alert-warning text-center fs-5 shadow-sm";

        averageContainer.innerHTML =
            "Impossible de calculer le Nutri-Score moyen, données insuffisantes.";
    }
}

// Chargement du fichier JSON local
fetch("ingredients.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors du chargement du fichier JSON local");
        }
        return response.json();
    })
    .then(ingredients => {

        const requests = ingredients.map(item => {
            const url =
                `https://world.openfoodfacts.org/api/v2/product/${item.id}` +
                `?fields=product_name,nutriscore_grade,image_front_small_url,nutriscore_score`;

            return fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {

                    if (
                        data.status === 1 &&
                        data.product &&
                        data.product.nutriscore_score !== undefined
                    ) {
                        addIngredient(item.texte, data.product);

                        totalScore += data.product.nutriscore_score;
                        validCount++;
                    } else {
                        addIngredient(item.texte, null);
                    }
                })
                .catch(error => {
                    console.error(
                        `Erreur pour l'ingrédient ${item.texte} :`,
                        error
                    );

                    addIngredient(item.texte, null);
                });
        });

        return Promise.all(requests);
    })
    .then(() => {
        updateAverageNutriScore();
    })
    .catch(error => {
        console.error("Erreur globale :", error);

        averageContainer.className =
            "alert alert-danger text-center fs-5 shadow-sm";

        averageContainer.innerHTML =
            "Erreur lors du chargement des données.";
    });