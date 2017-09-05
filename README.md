Personal Goals CLI
==================
Inspired by [Una Kravets](http://una.im/personal-goals-guide)  
Simple way to create and manage weekly/monthly/yearly/other goals

To use: `yarn global add personal-goals-cli`  
make sure to set the active directory and where to store your README although they will default to the folder you first call `goals` from.

```
goals cfg dir '/users/me/projects/personal-goals/goals'

goals cfg readme '/users/me/projects/personal-goals/'
```
They can be the same, I just like the goals contained in their own folder 😀


# Examples: 

All commands will start with `goals`

## Creating a new goal

You can use `new` or `n` to create a new goal followed by the type (`yearly` or `y`, `monthly` or `m`, `weekly` or `w`, `other` or `o`).  

The default is `weekly`
```
goals new w 'track my personal goals'                     #creates a new weekly goal

goals n other 'contribute to 3 open source projects'      #creates a new 'other' goal

goals n y 'survive another year'                          #creates a new yearly goal
```

## Marking a goal as completed

You can use `complete` or `c` to mark a goal as completed followed by the type (`yearly` or `y`, `monthly` or `m`, `weekly` or `w`, `other` or `o`).  

The default is `weekly`
```
goals complete w      #will list all weekly goals and allow you to choose which to mark as completed

goals c               #will list all weekly goals and allow you to choose which to mark as completed

goals c y             #will list all yearly goals and allow you to choose which to mark as completed
```

## Listing Goals

You can use `ls` or `list` to list goals followed by the type (`yearly` or `y`, `monthly` or `m`, `weekly` or `w`, `other` or `o`, `completed` or `c`, or `all` or `a`).  

The default is `all`
```
goals ls             #lists all goals

goals list           #lists all goals

goals ls c           #lists all completed goals

goals list y         #lists all yearly goals

goals ls weekly      #lists all weekly goals
```

## Changing Config

You can use `config` or `cfg` to manage the configuration settings

Possible configuration keys are `dir`, `readme`, `types`, `alias`, `focus`, and `title`

The `dir` is where your goals reside and `readme` is where you want the README.md to be generated


```
goals cfg dir '/users/me/projects/personal-goals/goals'

goals cfg readme '/users/me/projects/personal-goals/'

goals config focus weekly 'getting enough sleep'

goals config focus weekly 'getting more involved in communities'

goals cfg focus monthly 'surviving the nazi-pocalypse'

goals cfg title weekly 'Shit I need to do this week'

goals cfg type today                    #creates a new goal of type 'today'

goals cfg alias t today                 #creates an alias for today so you can shorten it to 't'

goals cfg clear type t                  #for when you want to delete a goal type  

goals config clear                      #will clear all config settings

goals config clear focus                #will delete the all focuses

goals config ls                         #will list the current config settings
```

## Clearing Goals 

You can use `clear` or `clr` to clear goal followed by the type (`yearly` or `y`, `monthly` or `m`, `weekly` or `w`, `other` or `o`, `completed` or `c`, or `all` or `a`).  

The default is `all`
```
goals clr                  #deletes all goals

goals clear weekly         #deletes all weekly goals

goals clr c                #deletes all completed goals
```

## Deleting Specific Goals 

You can use `delete`, `d`, or `del` to delete a goal followed by the type (`yearly` or `y`, `monthly` or `m`, `weekly` or `w`, `other` or `o`, `completed` or `c`, or `all` or `a`).  

The default is `weekly`
```
goals del                  #lists weekly goals anand will allow you to choose which to delete

goals delete y             #lists yearly goals anand will allow you to choose which to delete

goals d month               #lists monthly goals anand will allow you to choose which to delete
```

### README:
The generated README will be in the following format where the order of the goals is configurable. Just edit the generated README and reorder as you wish 

```
Personal Goals
==============
Personal goals made open source for accessibility across computers I use, transparency, accountability, and versioning. Learn more about it [here](http://una.im/personal-goals-guide).

Generated by the [personal-goals-cli](https://github.com/kevindavus/personal-goals-cli)


<!-- goals yearly start-->
# Overarching Goals for 2017:
### This year's focus: 
  
    
<!-- goals yearly end-->

<!-- goals weekly start-->
# Weekly Goals Sep 4th, 2017:
### This week's focus: 
  
<!-- goals weekly end-->

<!-- goals monthly start-->
# Monthly Goals September 2017:
### This month's focus: 
  
<!-- goals monthly end-->

<!-- goals other start-->
# Other Goals:
        
<!-- goals other end-->
```

and will render like this :


Personal Goals
==============
Personal goals made open source for accessibility across computers I use, transparency, accountability, and versioning. Learn more about it [here](http://una.im/personal-goals-guide).

Generated by the [personal-goals-cli](https://github.com/kevindavus/personal-goals-cli)


<!-- goals yearly start-->
# Overarching Goals for 2017:
### This year's focus: 
  
    
<!-- goals yearly end-->

<!-- goals weekly start-->
# Weekly Goals Sep 4th, 2017:
### This week's focus: 
  
<!-- goals weekly end-->

<!-- goals monthly start-->
# Monthly Goals September 2017:
### This month's focus: 
  
<!-- goals monthly end-->

<!-- goals other start-->
# Other Goals:
        
<!-- goals other end-->
