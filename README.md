# a simple vue-toast tool

### import

```
  import Toast from 'vue-toast';
  Vue.prototype.$toast = Toast;
```

### use

#### default
```
  vm.$toast({
    message: 'message...',
    duration: 2500,
    icon: 'icon url' 
  })
```

#### success
```
  vm.$toast.success('success')
```

#### fail
```
  vm.$toast.fail('success')
```

#### loading and close
```
  vm.$toast.loading('loading...')
  setTimeout(() => vm.$toast.close(), 1000);
```
