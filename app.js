new Vue({
  el : '#app',
  data : {
    playerHealth : 100,
    monsterHealth : 100,
    game_is_on : false,
    logs : [],
    attack_multiple : 10,
    monster_attack_multiple : 15,
    special_attack_multiple : 25,
    heal_up_multiple : 20,
    log_text : {
      attack : 'Oyuncu Atağı',
      monster_attack : 'Canavarın Atağı',
      special_attack : 'Özel Oyuncu Atağı',
      heal_up : 'İlk Yardım',
      give_up : 'Oyunc pes Etti!'
    },
  },
  methods : {
    start_game(){
      this.game_is_on = true;
    },
    attack(){
      var point = Math.ceil(Math.random() * this.attack_multiple);
      // this.monster = this.monster - point
      this.monsterHealth -= point;
      this.monster_attack();
      this.add_to_log({ turn: 'Player', text: this.log_text.attack + point })
    },
    monster_attack(){
      var point = Math.ceil(Math.random() * this.monster_attack_multiple);
      this.playerHealth -= point;
      this.add_to_log({ turn: 'Monster', text: this.log_text.monster_attack + point })
    },
    special_attack(){
      var point = Math.ceil(Math.random() * this.special_attack_multiple);
      this.monsterHealth -= point;
      this.monster_attack();
      this.add_to_log({ turn: 'Player', text: this.log_text.special_attack + point })
    },
    heal_up(){
      var point = Math.ceil(Math.random() * this.heal_up_multiple);
      this.playerHealth += point;
      this.monster_attack();
      this.add_to_log({ turn: 'Player', text: this.log_text.heal_up + point })
    },
    give_up(){
      this.playerHealth = 0;
      this.add_to_log({ turn: 'Player', text: this.log_text.give_up })
    },
    add_to_log(log){
      this.logs.push(log);
    }
  },
  watch : {
    playerHealth(value){
      if( value <= 0){
        this.playerHealth = 0
        if(confirm('Oyunu KAYBETTİN. Tekrar denemek ister misin')){
          this.playerHealth = 100;
          this.monsterHealth = 100; 
          this.logs = [];
        };
      } else if( value >= 100){
        this.playerHealth = 100
      }
    },
    monsterHealth(value){
      if( value <= 0){
        this.monsterHealth = 0
        if(confirm("Oyunu KAZANDIN. Tekrar denemek ister misin?")){
          this.playerHealth = 100;
          this.monsterHealth = 100;
          this.logs = [];
        };
      }
    },
  },
  computed : {
    player_progress(){
      return {
        width : this.playerHealth + '%'
      }
    },
    monster_progress(){
      return {
        width : this.monsterHealth + '%'
      }
    }
  }
})