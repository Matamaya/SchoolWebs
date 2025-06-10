document.addEventListener('DOMContentLoaded', function() {
    var itemsContainer = document.getElementById('listaObjetos');
    var Cantitems = 100;

    fetch('https://pokeapi.co/api/v2/item?limit=' + Cantitems)
        .then(response =>  response.json()
        .then(data => {
                data.results.forEach(item => {
                fetch(item.url)
                    .then(response=>  response.json())
                    .then(itemDetails=> 
                        showItem(itemDetails));
            });
        }));
    
    function showItem(item) {
        var itemElement = document.createElement('div');
        itemElement.className = 'item-card';
        
        var itemName = item.name;
        itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);
        
        var itemImage = item.sprites.default;
        
        var itemDescription = item.effect_entries[0].short_effect;
        
        var isConsumable = 'No';
        for (var j = 0; j < item.attributes.length; j++) {
            if (item.attributes[j].name === 'consumable') {
                isConsumable = 'Yes';
                break;
            }
        }
        
        var isBattleUsable = 'No';
        if (item.attributes) {
            for (var i = 0; i < item.attributes.length; i++) {
                if (item.attributes[i].name === 'usable-in-battle' || item.attributes[i].name === 'holdable-active') {
                    isBattleUsable = 'Yes';
                    break;
                }
            }
        }

        itemElement.innerHTML = '<div class="item-header">' +
                               '<h2>' + itemName + '</h2>' +
                               '<img src="' + itemImage + '" alt="' + itemName + '">' +
                               '</div>' +
                               '<div class="item-details">' +
                               '<p><strong>Description:</strong> ' + itemDescription + '</p>' +
                               '<p><strong>Consumable:</strong> ' + isConsumable + '</p>' +
                               '<p><strong>Battle usable:</strong> ' + isBattleUsable + '</p>' +
                               '</div>';
        
        itemsContainer.appendChild(itemElement);
    }
});