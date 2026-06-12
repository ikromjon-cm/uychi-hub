from django.contrib.auth.models import User


class UserProxy(User):
    class Meta:
        proxy = True
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.get_full_name() or self.username
