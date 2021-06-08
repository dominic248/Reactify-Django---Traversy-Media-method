from chatterbot.ext.django_chatterbot.abstract_models import AbstractBaseStatement, AbstractBaseTag,AbstractBaseStatementTags

class StatementTag(AbstractBaseStatementTags):
    """
    A label that categorizes a statement.
    """
    pass
   
           
class Statement(AbstractBaseStatement):
    """
    A statement represents a single spoken entity, sentence or
    phrase that someone can say.
    """
    pass
    class Meta:
        db_table = 'statement1'


class Tag(AbstractBaseTag):
    """
    A label that categorizes a statement.
    """
    pass
    class Meta:
        db_table = 'tag'    
        
      

        

