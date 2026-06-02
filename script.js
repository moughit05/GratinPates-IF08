const plist = document.getElementById("productList");

// Fonction pour créer la carte HTML
const addIngredient = function(texte_recette, product = null) {
  const content = document.createElement("div");
  content.className = "col-12 col-sm-6 col-md-4 col-lg-3 card text-center p-3 mb-3 mx-2"; 

  if (product) {
      // Le produit a été trouvé sur OpenFoodFacts
      const nutriScore = product.nutriscore_grade || "unknown";
      const imageUrl = product.image_front_small_url || "https://placehold.co/150x150?text=Pas+d'image";
      const productName = product.product_name || "Produit inconnu";

      content.innerHTML = `
        <img src="${imageUrl}" alt="${productName}" class="rounded-circle mx-auto mb-2" style="width: 100px; height: 100px; object-fit: cover;" />
        <p class="fw-bold mb-1">${productName}</p>
        <p class="small text-muted">${texte_recette}</p>
        <img src="https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${nutriScore}.svg" alt="Nutri-Score ${nutriScore}" style="height: 40px; margin: 0 auto;">
      `;
  } else {
      // Erreur 404 : Le produit n'existe pas sur OpenFoodFacts
      // Utilisation d'un nouveau générateur d'image qui ne sera pas bloqué
      content.innerHTML = `
        <img src="https://placehold.co/150x150/eeeeee/999999?text=Introuvable" alt="Introuvable" class="rounded-circle mx-auto mb-2" style="width: 100px; height: 100px; object-fit: cover;" />
        <p class="fw-bold mb-1 text-danger">Données indisponibles</p>
        <p class="small text-muted">${texte_recette}</p>
      `;
  }

  plist.appendChild(content);
};

// 1. Récupération des données depuis ton fichier local JSON
fetch('ingredients.json')
  .then(response => {
      if (!response.ok) throw new Error("Erreur lors du chargement du fichier JSON local");
      return response.json();
  })
  .then(ingredients => {
      // 2. Pour chaque ingrédient du JSON, on interroge l'API OpenFoodFacts
      ingredients.forEach(item => {
          const url = `https://world.openfoodfacts.org/api/v2/product/${item.id}?fields=product_name,nutriscore_grade,image_front_small_url`;
          
          fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP " + response.status); 
                }
                return response.json();
            })
            .then(data => {
                // Vérification du statut [cite: 107, 108, 109]
                if (data.status === 1) {
                    addIngredient(item.texte, data.product);
                } else {
                    addIngredient(item.texte, null);
                }
            })
            .catch(error => {
                // L'API a renvoyé un 404. On affiche la carte de secours silencieusement.
                addIngredient(item.texte, null); 
            });
      });
  })
  .catch(error => console.error("Erreur globale :", error));