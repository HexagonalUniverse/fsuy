from django.apps import AppConfig


class FsuySiteConfig(AppConfig):
    name: str = "fsuy_site"

    def ready(self) -> None:

        # BLANK~~

        return None

        #from .models.games import Game
        #
        #print("GAME:")
        #for game in Game.objects.all():
        #    print(game.gid, game.name)
