from django.conf.urls import include, url
from django.contrib import admin

from le_voyage_dans_l_espace import urls

admin.autodiscover()

urlpatterns = [
	# Examples:
	# url(r'^$', 'tpe.views.home', name='home'),
	# url(r'^blog/', include('blog.urls')),

	url(r'^admin/', include(admin.site.urls)),
	url(r'^', include('le_voyage_dans_l_espace.urls'))
]
