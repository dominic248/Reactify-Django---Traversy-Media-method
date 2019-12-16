@echo off
echo
echo 1. startproject
echo 2. startapp
echo 3. runserver
echo 4. makemigrations
echo 5. migrate
echo 6. createsuperuser
echo 7. collectstatic
echo 8. pip freeze
echo 9. install requirements.txt
echo 10. rename folder to src
echo 11. venv activate
echo 12. custom venv deactivate
echo 13. venv deactivate
echo 40. git init
echo 41. git log
echo 42. git remote -v
echo 43. git remote add
echo 44. git remote set-url
echo 45. git remote rm
echo 46. git add
echo 47. git commit
echo 48. git push
set /P N=Enter switch case number:
:switch-case-example
  :: Call and mask out invalid call targets
  goto :switch-case-N-%N% 2>nul || (
    :: Default case
    echo Invalid Option!!!
  )
  goto :switch-case-end
  :switch-case-N-1
    set /p project=Project name?
    cd src && django-admin startproject %project% .
    cd..
    goto :switch-case-end
  :switch-case-N-2
    set /p appname=App name?
    cd src && python manage.py startapp %appname% 
    cd..
    echo Done...
    goto :switch-case-end
  :switch-case-N-3
    cd src && python manage.py runserver  
    cd..
    echo Done...
    goto :switch-case-end
  :switch-case-N-4
    cd src && python manage.py makemigrations 
    cd..
    echo Done...
    goto :switch-case-end
  :switch-case-N-5
    cd src && python manage.py migrate
    cd..
    echo Done...
    goto :switch-case-end
  :switch-case-N-6
    cd src && python manage.py createsuperuser 
    cd..
    echo Done...
    goto :switch-case-end
  
  :switch-case-N-7
    cd src && python manage.py collectstatic --no-input  
    cd..
    echo Done...
    goto :switch-case-end
  :switch-case-N-8
    cd src && pip freeze>requirements.txt 
    cd..
    echo Done...
    goto :switch-case-end
  :switch-case-N-9
    cd src && pip install -r requirements.txt 
    cd..
    echo Done...
    goto :switch-case-end
  :switch-case-N-10
    set /p folname=Folder to rename to src?
    ren %folname% src
    echo Done...
    goto :switch-case-end
  :switch-case-N-11
    venv-v3.8.0\scripts\activate
    goto :switch-case-end
  :switch-case-N-12
    set /p venvname=Virtual environment name?
    %venvname%\scripts\activate
    goto :switch-case-end
  :switch-case-N-13
    set /p venvname=Virtual environment name?
    %venvname%\scripts\deactivate
    goto :switch-case-end
  :switch-case-N-40
    git init
    goto :switch-case-end
  :switch-case-N-41
    git log
    goto :switch-case-end  
  :switch-case-N-42
    git remote -v
    goto :switch-case-end   
  :switch-case-N-43
    set /p remote=New Remote name?
    set /p url=New Remote URL?
    git remote add %remote% %url%
    goto :switch-case-end  
  :switch-case-N-44
    set /p remote=Old Remote name?
    set /p url=New Remote URL?
    git remote set-url %remote% %url%
    goto :switch-case-end  
  :switch-case-N-45
    set /p remote=Remote name to remove?
    git remote rm %remote%
    goto :switch-case-end   
  :switch-case-N-46
    set /p optadd=Optional Add Arguments?
    git add %optadd%
    goto :switch-case-end
  :switch-case-N-47
    set /p message=Commit Message?
    git commit -m "%message%"
    goto :switch-case-end
  :switch-case-N-48
    set /p remote=Remote name?
    set /p branch=Branch name?
    git push %remote% %branch%
    goto :switch-case-end    
  
:switch-case-end
  echo Exiting!!!