<?php

namespace Controller;

class Controller
{

// Variable Attributes
var $controllerName;
var $controllerMethod;

//Method untuk mengambil semua atribut
public function getControllerAttribute( )
{
return [
"ControllerName" => $this->controllerName,
"Method" => $this->controllerMethod,

];
}
}