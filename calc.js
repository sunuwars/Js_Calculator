
var disp_value = "0";
var first_operand = 0;
var second_operand = 0;
var operation = "";
var answer = 0;
var equals_flag = false;
var decimal_flag = false;
var first_decimal_flag = true;
var operator_cache = "";
var operator_concatenated = false; //to signify multiple operators pressed for same calcuation eg 2++++3 or 2+-/*5
var equals_concatenated = false;

//document.getElementById("zero").onclick = clicked_val_zero; alert('pachi');

function clicked_val(val)
{//alert(val);
  // if decimal is pressed, format strings accordingly and set decimal_flag true
  operator_concatenated = false; //set this to signify this is not operator concatenation
  equals_concatenated = false;
  if (val == '.')
  { // alert(val);
    var res = disp_value.split('.'); //alert('disp_value='+disp_value);alert('res='+res);
    disp_value = res[0].concat('.'.concat(res[1]));//alert('disp_value='+disp_value);
    decimal_flag = true;
    //alert(disp_value);
  }

  else
  {
    if ((disp_value == '0' || (equals_flag)) && decimal_flag != true)
    { //alert('here');
      disp_value = val;
      document.getElementById('display').innerHTML = disp_value;
      equals_flag = false;
//decimal_flag = false;
    }
    else
    {
      var resnext = disp_value.split('.'); //alert('disp_value='+disp_value);
      // if decimal_flag == true concat incoming string after values in decimal point
      if (equals_flag == true && decimal_flag == true && first_decimal_flag == true )
      { //alert('here');
        disp_value = '0'.concat('.'.concat(val));
        first_decimal_flag = false;
      }
      // if decimal_flag == true concat incoming string after values in decimal point
      else if (decimal_flag == true)
      {
        //alert(resnext);
        disp_value = resnext[0].concat('.');//alert('disp_value='+disp_value);

        if (first_decimal_flag == true)
        {
          disp_value = disp_value.concat(val); //alert(disp_value);
          first_decimal_flag = false;
        }
        else
        { //if it is not first_decimal_flag eg 1.2 then another 35 implement 1.235
          disp_value = disp_value.concat(resnext[1].concat(val)); //alert(disp_value);
        }
        //disp_value = disp_value.concat(val);
        //document.getElementById('display').innerHTML = disp_value;
      }
      else
      {
      //  var resnext = disp_value.split('.'); //alert('disp_value='+disp_value);
        //alert(resnext);
        disp_value = resnext[0].concat(val);//alert('disp_value='+disp_value);
//disp_value = disp_value.concat('.'.concat(resnext[1])); //alert(disp_value);
        //disp_value = disp_value.concat(val);
      }

      document.getElementById('display').innerHTML = disp_value;
    }
  }
  //else if

}

function all_clear(){
  disp_value = "0";
  first_operand = 0;
  second_operand = 0;
  answer = 0;
  operation = "";
  operator_cache = "";
  equals_flag = false;
  decimal_flag = false;
  first_decimal_flag = true;
  operator_concatenated = false;
  equals_concatenated = false;
  document.getElementById('display').innerHTML = disp_value;
}
//clear calculation values
function clear_cal_vars(){
  first_operand = 0;
  second_operand = 0;
  answer = 0;
  //operation = "";
  decimal_flag = false;
  first_decimal_flag = true;
  operator_cache = "";
  //equals_flag = false;
}

function math_operation(operation_type){
  //if add has not been pressed already just before this
  //if this is the first time operation key is pressed
  //if (operation == "")
//  {
    //alert(operation_type);
  operation = operation_type;
  equals_concatenated = false; //??

  if (operator_concatenated == false) //if this is not multiple oprator press on same operation eg 3+-/*6
  //in which case the last operator is saved as operation
  { //alert('not_concatenated');
      if(operator_cache == "") //eg 2+
      {
        first_operand += parseFloat(disp_value); //alert(first_operand);
        disp_value = "0";
        decimal_flag = false;
        first_decimal_flag = true;
        document.getElementById('display').innerHTML = disp_value;
      }
      else //eg 2+3+ we need to show 5 and update + as operation
      { //perform earlier operator's mathematical operation
        equals_value(operator_cache);
        first_operand = disp_value;
      }
  }
  operator_cache = operation_type;
  operator_concatenated = true; //signify mathematical operator has just been pressed.
  //alert('operation1= '+operation);
}
//operation parameter is active-operation in effect, 'operation' is also a global variable name,which
//impements operator key pressed in case of single level calculation eg 3+2=, 2-2= etc but if it is a multiple level
//calculation like 2+2+3 or 2-2+3 etc then active-operation is operator-cache value
function equals_value(operation)
{//alert(operation);
//('equals_concatenated='+equals_concatenated);
//alert('equals_flag= '+equals_flag);
  if (!equals_concatenated) //to ensure pressing multiple == doesn't recalculate the sums
  {
    //if (key_pressed == '=')
    //{
    equals_flag = true;
    //}
    //alert('equals_flag= '+equals_flag);
      //alert('first_operand='+ first_operand);
    //alert(disp_value);
      second_operand = document.getElementById('display').innerHTML;
    //alert(disp_value);
      //second_operand = second_operand;
     //alert('second_operand='+ second_operand); alert(operation);
      first_operand = parseFloat(first_operand); //alert('first_operand='+ first_operand);
      second_operand = parseFloat(second_operand); //alert('second_operand='+ second_operand);
//  alert('operator_cache='+operator_cache);
      if (operation == '=')
        operation = operator_cache;
//alert(operation);
      switch(operation)
      {
        case('+'): answer = first_operand + second_operand;disp_value = answer.toString();break;
        case('-'): answer = first_operand - second_operand;disp_value = answer.toString();break;
        case('*'): answer = first_operand * second_operand;disp_value = answer.toString();break;
        case('/'): answer = first_operand / second_operand;disp_value = answer.toString();break;

        //default: answer = 0;break;
      }
      //alert(disp_value);
      clear_cal_vars();
      document.getElementById('display').innerHTML = disp_value;
    }
    equals_concatenated = true; //to ensure pressing multiple == doesn't recalculate the sums

}
