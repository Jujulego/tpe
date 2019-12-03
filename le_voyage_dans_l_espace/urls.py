from django.conf.urls import url

from .views import *

urlpatterns = [
	# Exemples:
	# url(r'^$', 'le_voyage_dans_l_espace.views.home', name='home'),
	# url(r'^blog/', include('blog.urls')),
	
	# page de développement (test)
	url(r'^test/$', test),

	# accès au sommaire d'une partie
	url(r'^sommaire-(?P<partie_slug>.+)/$', avoir_sommaire_partie, name='sommaire'),
	
	# accès à une page du site
	url(r'^(?P<slug>.+)/$', avoir_page, name='page'),
	
	# page d'accueil
	url(r'^$', accueil, name='accueil')
]
