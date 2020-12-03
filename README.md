Lancez votre propre site d'avis de restaurants


Vous avez choisi de vous lancer dans le business des avis de restaurants. Votre objectif :
créer un service simple et utile qui permet d'avoir des avis sur des restaurants autour de soi.

Pour ce projet, vous allez devoir apprendre à utiliser des API externes, telles que celles de Google Maps et de Google Places (votre plus gros concurrent ;) ).
Et ce n'est pas tout : vous allez devoir orchestrer toutes ces informations de manière cohérente dans votre application !

Etape 1 : la carte des restaurants

Commencez par les fondations de votre application. Il y aura 2 sections principales : == 100%
Une carte Google Maps, chargée avec l'API de Google Maps == 100%

Une liste de restaurants correspondant à la zone affichée sur la carte Google Maps == 100%

Vous placerez ces éléments côte à côte. 100%

La carte Google Maps sera centrée immédiatement sur la position de l'utilisateur. 100%
Vous utiliserez l'API de géolocalisation de JavaScript. 100%
Un marqueur de couleur spécifique sera placé à l'emplacement de l'utlisateur. 100% 

Une liste de restaurants est fournie sous forme de données JSON présentées dans un fichier à part. 100%
En temps normal, ces données vous seraient renvoyés par un backend via une API,
mais pour cet exercice il sera pour le moment suffisant de charger en mémoire tous les restaurants en mémoire directement.


Affichez ces restaurants grâce à leurs coordonnées GPS sur la carte. 100%
Les restaurants qui sont actuellement visibles sur la carte doivent être affichés sous forme de liste sur le côté de la carte. 100%
Vous afficherez la moyenne des commentaires de chaque restaurant (qui va de 1 à 5 étoiles). 100%

Lorsqu'on clique sur un restaurant, la liste des avis enregistrés s'affiche avec les commentaires. Affichez aussi la photo Google Street View grâce à l'API correspondante.100%




Un outil de filtre permet d'afficher uniquement les restaurants ayant entre X et Y étoiles. La mise à jour de la carte s'effectue en temps réel. 100%

Fichiers à fournir :

Code HTML / CSS / JS du projet

Etape 2 : ajoutez des restaurants et des avis !
Vos visiteurs aimeraient eux aussi donner leur avis sur des restaurants !Proposez-leur :

D'ajouter un avis sur un restaurant existant

D'ajouter un restaurant, en cliquant sur un lieu spécifique de la carte

Une fois un avis ou un restaurant ajouté, il apparaît immédiatement sur la carte. Un nouveau marqueur apparaît pour indiquer la position du nouveau restaurant.

Les informations ne seront pas sauvegardées si on quitte la page (elles restent juste en mémoire le temps de la visite).

Fichiers à fournir :

Code HTML / CSS / JS du projet

Etape 3 : intégration avec l'API de Google Places
Pour l'instant, il n'y a pas beaucoup de restaurants et pas beaucoup d'avis. Heureusement, Google Places propose une API pour récupérer des restaurants et des avis. Servez-vous en pour afficher des restaurants et avis supplémentaires sur votre carte ! Ici la documentation : https://developers.google.com/places/



Vous utiliserez la search api pour trouver des restaurants dans la zone affichée.

Lisez bien la documentation pour savoir comment accéder aux données de Google Places et n'hésitez pas à faire autant de recherches Google que nécessaire quand vous butez sur un problème. ;)
