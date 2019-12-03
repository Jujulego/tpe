"""
Django settings for tpe project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'j)l(m@moc(g8zjig172__h)f++ue1*mw_(zo$ddi8g%ggx$9qk'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["www.julien.capellari.net", "julien.capellari.net", "127.0.0.1"]
ADMINS = (
    ('Julien Capellari', 'julien.capellari@free.fr'),
)

# Email
EMAIL_HOST = 'mail'
EMAIL_FILE_PATH = BASE_DIR + '/email'
SERVER_EMAIL = 'tpe@capellari.net'

# Application definition
INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'le_voyage_dans_l_espace',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

APPEND_SLASH = True
ROOT_URLCONF = 'tpe.urls'
WSGI_APPLICATION = 'tpe.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/
LANGUAGE_CODE = 'fr-FR'
TIME_ZONE = 'Europe/Paris'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'APP_DIRS': True,
        'DIRS': [BASE_DIR + "/templates"],
        'OPTIONS': {
            'context_processors': [
                'django.contrib.auth.context_processors.auth'
            ]
        }
    }
]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/
STATIC_URL = '/static/'

STATICFILES_DIRS = (
    BASE_DIR + "/static",
)

# Medias
MEDIA_ROOT = BASE_DIR + "/media"
MEDIA_URL = '/media/'
