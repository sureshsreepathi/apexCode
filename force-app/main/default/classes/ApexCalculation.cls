public class ApexCalculation {
    Public static void Calculator(String vary, Decimal a, Decimal b){
        Decimal x = a;
        Decimal y = b;

        if('vary' == 'addition'){
            Decimal sum = x + y;
            system.debug('Sum of two numbers ='+ sum);
        }
        else if('vary' == 'subtraction'){
            Decimal subtract = x - y;
            system.debug('Sum of two numbers ='+ subtract);
        }
        else if('vary' == 'multiplication'){
            Decimal multiply = x * y;
            system.debug('Sum of two numbers ='+ multiply);
        }
        else if('vary' == 'division' && y != 0){
            Decimal division = x / y;
            system.debug('Sum of two numbers ='+ division);
        }
        

    }
}
