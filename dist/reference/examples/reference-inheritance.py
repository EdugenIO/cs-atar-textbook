# Inheritance and method overriding
# Expected output:
# Resource
# Book
class Resource:
    def label(self):
        return "Resource"

class Book(Resource):
    def label(self):
        return "Book"

resources = [Resource(), Book()]
for resource in resources:
    print(resource.label())
