from django.contrib import admin
from .models import  pizza, toppings, subs, subsAdds, pasta, Salads, DinnerPlatters, order


 
admin.site.register(pizza)
admin.site.register(toppings)
admin.site.register(subs)
admin.site.register(subsAdds)
admin.site.register(Salads)
admin.site.register(pasta)
admin.site.register(DinnerPlatters)
admin.site.register(order)