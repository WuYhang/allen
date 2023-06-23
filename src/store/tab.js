import Cookie from 'js-cookie'
export default {
    state: {
        isCollapse: false,//控制菜单展开或收起
        // 面包屑
        tabsList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
        ],
        // 面包屑数据
        menu: [],
        addMenu: [],
    },
    mutations: {
        // 修改菜单展开收起的方法
        CollapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        // 更新面包屑数据
        selectMenu(state, val) {
            console.log(val, 'val')
            if (val.name != "home") {
                const index = state.tabsList.findIndex(item => item.name == val.name)
                if (index === -1) {
                    state.tabsList.push(val)
                }
            }
        },
        // 删除指定的tag数据
        closeTag(state, item) {
            console.log(item, 'item')
            const index = state.tabsList.findIndex(val => val.name == item.name)
            state.tabsList.splice(index, 1)
        },
        // 设置menu的数据
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        //动态注册路由
        addMenu(state, router) {
            // 判断缓存中是否有数据
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            // Cookie.remove('menu')
            state.menu = menu
            // 处理动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.path}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            console.log(menuArray, 'menuArray')
            // 路由动态添加
            menuArray.forEach(item => {
                // menu.forEach是没有component属性的数组
                router.addRoute('Main',item)
            })
        }
    }
}