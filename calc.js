
var disp_value = "0";
var first_operand = 0;
var second_operand = 0;
var operation = "";
var answer = 0;
var equals_flag = false;
var decimal_flag = false;
var first_decimal_flag = true;
var operator_cache = "";
//to signify multiple operators pressed for same calcuation eg 2++++3 or 2+-/*5
var operator_concatenated = false;
var equals_concatenated = false;

//register button press, where val is the value of button pressed
function clicked_val(val)
{
  //set this to signify this is not operator concatenation
  operator_concatenated = false;
  equals_concatenated = false;
  if (val == '.')
  {
    var res = disp_value.split('.');
    disp_value = res[0].concat('.'.concat(res[1]));
    decimal_flag = true;
  }

  else
  {
    if ((disp_value == '0' || (equals_flag)) && decimal_flag != true)
    {
      disp_value = val;
      document.getElementById('display').innerHTML = disp_value;
      equals_flag = false;

    }
    else
    {
      var resnext = disp_value.split('.');
      // if decimal_flag == true concat incoming string after values in decimal point
      if (equals_flag == true && decimal_flag == true && first_decimal_flag == true )
      {
        disp_value = '0'.concat('.'.concat(val));
        first_decimal_flag = false;
      }
      // if decimal_flag == true concat incoming string after values in decimal point
      else if (decimal_flag == true)
      {
        disp_value = resnext[0].concat('.');

        if (first_decimal_flag == true)
        {
          disp_value = disp_value.concat(val);
          first_decimal_flag = false;
        }
        else
        { //if it is not first_decimal_flag eg 1.2 then another 35 implement 1.235
          disp_value = disp_value.concat(resnext[1].concat(val)); //alert(disp_value);
        }
      }
      else
      {
        disp_value = resnext[0].concat(val);
      }

      document.getElementById('display').innerHTML = disp_value;
    }
  }

}
//resets all calculation variables to initial state
function all_clear()
{
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

  decimal_flag = false;
  first_decimal_flag = true;
  operator_cache = "";

}

function math_operation(operation_type){
  operation = operation_type;
  equals_concatenated = false;
  //if this is not multiple oprator press on same operation eg 3+-/*6 in which case the last operator is saved as operation
  if (operator_concatenated == false)
  {
      if(operator_cache == "") //eg 2+
      {
        first_operand += parseFloat(disp_value);
        disp_value = "0";
        decimal_flag = false;
        first_decimal_flag = true;
        document.getElementById('display').innerHTML = disp_value;
      }
      //eg 2+3+ we need to show 5 and update + as operation
      else
      {
        //perform earlier operator's mathematical operation
        equals_value(operator_cache);
        first_operand = disp_value;
      }
  }
  operator_cache = operation_type;
  //signify mathematical operator has just been pressed.
  operator_concatenated = true;
}
/* operation parameter is active-operation in effect, 'operation' is also a global variable name,which
* impements operator key pressed in case of single level calculation eg 3+2=, 2-2= etc but if it is a multiple level
* calculation like 2+2+3 or 2-2+3 etc then active-operation is operator-cache */
function equals_value(operation)
{
  //to ensure pressing multiple == doesn't recalculate the sums
  if (!equals_concatenated)
  {
    equals_flag = true;
    second_operand = document.getElementById('display').innerHTML;
    first_operand = parseFloat(first_operand);
    second_operand = parseFloat(second_operand);
    if (operation == '=')
    {
      operation = operator_cache;
    }

    switch(operation)
    {
      case('+'): answer = first_operand + second_operand;disp_value = answer.toString();break;
      case('-'): answer = first_operand - second_operand;disp_value = answer.toString();break;
      case('*'): answer = first_operand * second_operand;disp_value = answer.toString();break;
      case('/'): answer = first_operand / second_operand;disp_value = answer.toString();break;

    }

    clear_cal_vars();
    document.getElementById('display').innerHTML = disp_value;
  }
  //to ensure pressing multiple == doesn't recalculate the sums
  equals_concatenated = true;

}
